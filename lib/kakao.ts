// 알리고 카카오 알림톡 — 상담 신청자 접수 안내 + 관리자 신규 문의 알림
// (barosocial/lib/kakao.ts 와 같은 방식)
//
// 흐름: 랜딩 폼 제출 저장 완료 → 이 함수 → 고정 IP 릴레이 서버(/alimtalk) → 알리고
// 알리고는 등록된 IP에서 온 요청만 허용하므로 Vercel에서 직접 보내지 않고 릴레이를 경유한다.
//
// 환경변수
//   ALIGO_API_KEY, ALIGO_USER_ID, ALIGO_SENDER_KEY, ALIGO_SENDER  (필수) 알리고 계정·발신 프로필
//   ALIGO_TEMPLATE_CODE, ALIGO_TEMPLATE_MESSAGE                   (필수) 신청자 안내 템플릿 — 본문은 등록된 템플릿과 글자까지 같아야 한다
//   ALIGO_TEMPLATE_SUBJECT, ALIGO_TEMPLATE_BUTTON                 (선택) 제목, 버튼 JSON (기본: 채널추가 버튼)
//   ALIGO_NEW_INQUIRY_PHONES                                      (선택) 관리자 알림 받을 번호, 쉼표 구분
//   PROXY_URL, PROXY_SECRET  (선택) 없으면 ADISON_PROXY_URL / ADISON_PROXY_SECRET (같은 릴레이)을 쓴다
//
// 실패해도 상담 신청 저장은 정상 완료되어야 하므로 이 함수들은 예외를 던지지 않는다.

const ALIGO_SEND_URL = 'https://kakaoapi.aligo.in/akv10/alimtalk/send/';
const TIMEOUT_MS = 5000;

interface AlimtalkData {
  contact: string;
}

interface AligoResult {
  code: number;
  message: string;
  info?: unknown;
}

export function parsePhones(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

function getProxy(): { url: string; secret: string } | null {
  const url = process.env.PROXY_URL || process.env.ADISON_PROXY_URL;
  const secret = process.env.PROXY_SECRET || process.env.ADISON_PROXY_SECRET;
  if (!url || !secret) return null;
  return { url: url.replace(/\/$/, ''), secret };
}

// 릴레이가 있으면 릴레이로, 없으면 알리고에 직접 보낸다(로컬 개발용 — 운영에서는 IP 차단됨).
async function postAlimtalk(payload: Record<string, string>): Promise<AligoResult> {
  const proxy = getProxy();
  const signal = AbortSignal.timeout(TIMEOUT_MS);

  const response = proxy
    ? await fetch(`${proxy.url}/alimtalk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-proxy-secret': proxy.secret },
        body: JSON.stringify(payload),
        signal,
      })
    : await fetch(ALIGO_SEND_URL, {
        method: 'POST',
        body: (() => {
          const formData = new FormData();
          Object.entries(payload).forEach(([k, v]) => formData.append(k, v));
          return formData;
        })(),
        signal,
      });

  const text = await response.text();
  // 릴레이 인증 실패 등은 { error } 형태라 code 가 없다 — 원인이 로그에 남도록 응답 원문을 담는다.
  let parsed: Partial<AligoResult> | null = null;
  try {
    parsed = JSON.parse(text) as Partial<AligoResult>;
  } catch {}
  if (!response.ok || typeof parsed?.code !== 'number') {
    return { code: -1, message: `릴레이 응답 오류 (${response.status}): ${text.slice(0, 100)}` };
  }
  return parsed as AligoResult;
}

function getAccount() {
  const apikey = process.env.ALIGO_API_KEY;
  const userid = process.env.ALIGO_USER_ID;
  const senderkey = process.env.ALIGO_SENDER_KEY;
  const sender = process.env.ALIGO_SENDER;
  if (!apikey || !userid || !senderkey || !sender) return null;
  return { apikey, userid, senderkey, sender };
}

export async function sendAlimtalk(data: AlimtalkData): Promise<{ success: boolean; error?: string }> {
  const account = getAccount();
  const tpl_code = process.env.ALIGO_TEMPLATE_CODE;
  const message = process.env.ALIGO_TEMPLATE_MESSAGE;

  if (!account || !tpl_code || !message) {
    console.warn('[KAKAO] 알리고 환경 변수가 설정되지 않아 알림톡 전송을 건너뜁니다');
    return { success: false, error: 'Aligo 환경 변수 미설정' };
  }

  // 템플릿에 등록된 버튼과 똑같이 보내야 한다. 빠지면 "메시지가 템플릿과 일치하지 않음"으로 실패.
  // 기본값은 채널추가(AC) 버튼. 템플릿 버튼이 바뀌면 ALIGO_TEMPLATE_BUTTON 에 JSON 으로 넣는다.
  const button = process.env.ALIGO_TEMPLATE_BUTTON ||
    JSON.stringify({ button: [{ name: '채널추가', linkType: 'AC', linkTypeName: '채널 추가' }] });

  try {
    const result = await postAlimtalk({
      ...account,
      tpl_code,
      receiver_1: data.contact.replace(/\D/g, ''),
      subject_1: process.env.ALIGO_TEMPLATE_SUBJECT || '상담 신청 접수 안내',
      message_1: message,
      button_1: button,
      failover: 'N',
    });

    if (result.code === 0) {
      console.log('[KAKAO] ✅ 알림톡 전송 성공:', result.message);
      return { success: true };
    }
    console.error('[KAKAO] ❌ 알림톡 전송 실패:', result.code, result.message);
    return { success: false, error: `${result.code}: ${result.message}` };
  } catch (error) {
    console.error('[KAKAO] ❌ 알림톡 전송 중 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}

// 관리자에게 "OOO님, 새로운 문의가 등록되었습니다." (알리고 템플릿 UH_4559)
export async function sendAdminNewInquiryAlimtalk(customerName: string): Promise<void> {
  const phones = parsePhones(process.env.ALIGO_NEW_INQUIRY_PHONES);
  const account = getAccount();
  if (phones.length === 0 || !account) return;

  const payload: Record<string, string> = { ...account, tpl_code: 'UH_4559', failover: 'N' };
  phones.forEach((phone, i) => {
    payload[`receiver_${i + 1}`] = phone.replace(/\D/g, '');
    payload[`subject_${i + 1}`] = '새 문의 알림';
    payload[`message_${i + 1}`] = `${customerName}님, 새로운 문의가 등록되었습니다.`;
  });

  try {
    const result = await postAlimtalk(payload);
    if (result.code === 0) console.log('[KAKAO] ✅ 관리자 신규 문의 알림톡 전송');
    else console.error('[KAKAO] 관리자 알림톡 전송 실패:', result.code, result.message);
  } catch (e) {
    console.error('[KAKAO] 관리자 알림톡 전송 실패:', e);
  }
}
