"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { readClickKeyFromSearch } from "@/lib/click-key";
import styles from "./landing.module.css";
import Footer from "./components/Footer";
import LandingSections from "./components/LandingSections";
import ConsultationIntro from "./components/ConsultationIntro";
import ConsultationSuccess from "./components/ConsultationSuccess";
import useScrollReveal from "./components/useScrollReveal";

const formatClickSource = (
  utmSource: string,
  materialId: string | null,
  blogId: string | null = null,
  cafeId: string | null = null,
): string => {
  const sourceMap: { [key: string]: string } = {
    daangn: "당근",
    tiktok: "틱톡",
    insta: "인스타",
    facebook: "페이스북",
    google: "구글",
    youtube: "유튜브",
    kakao: "카카오",
    naver: "네이버",
    naverblog: "네이버블로그",
    toss: "토스",
    mamcafe: "맘카페",
    cashslide: "캐시슬라이드",
    cashwalk: "캐시워크",
    naverreward: "네이버리워드",
  };
  const cafeNameMap: { [key: string]: string } = {
    mygodsend: "화성남양애",
    yul2moms: "율하맘",
    chbabymom: "춘천맘",
    seosanmom: "서산맘",
    redog2oi: "부천소사구",
    cjsam: "순광맘",
    chobomamy: "러브양산맘",
    jinhaemam: "창원진해댁",
    momspanggju: "광주맘스팡",
    cjasm: "충주아사모",
    ksn82599: "둔산맘",
    magic26: "안평맘스비",
    anjungmom: "평택안포맘",
    tlgmdaka0: "시맘수",
    babylovecafe: "베이비러브",
    naese: "중리사랑방",
  };
  const shortSource = sourceMap[utmSource] || utmSource;
  if (blogId) return `${shortSource}_${blogId}`;
  if (cafeId) return `${shortSource}_${cafeNameMap[cafeId] || cafeId}`;
  if (materialId) return `${shortSource}_소재_${materialId}`;
  return shortSource;
};

function LandingContent() {
  const landingRef = useRef<HTMLElement>(null);
  useScrollReveal(landingRef);
  const searchParams = useSearchParams();
  const [clickSource, setClickSource] = useState("");
  const [done, setDone] = useState(false);
  const [showFloating, setShowFloating] = useState(false);

  // 폼 상태
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    residence: "",
    education: "",
    hope_course: "사회복지사",
    reason: "",
    memo: "",
  });
  // 빠른 상담 토글 (기본 OFF)
  const [fastConsult, setFastConsult] = useState(false);
  // 상담 선호 시간 (복수선택)
  const [preferredTimes, setPreferredTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  useEffect(() => {
    const utmSource = searchParams.get("utm_source");
    const materialId = searchParams.get("material_id");
    const blogId = searchParams.get("blog_id");
    const cafeId = searchParams.get("cafe_id");
    if (utmSource) {
      setClickSource(formatClickSource(utmSource, materialId, blogId, cafeId));
      return;
    }
    const referrer = document.referrer;
    const cafeMap: [string, string][] = [
      ["redog2oi", "맘카페_부천소사구"],
      ["babylovecafe", "맘카페_베이비러브"],
      ["magic26", "맘카페_안평맘스비"],
      ["chobomamy", "맘카페_러브양산맘"],
      ["jinhaemam", "맘카페_창원진해댁"],
      ["momspanggju", "맘카페_광주맘스팡"],
      ["cjasm", "맘카페_충주아사모"],
      ["yul2moms", "맘카페_율하맘"],
      ["chbabymom", "맘카페_춘천맘"],
      ["ksn82599", "맘카페_둔산맘"],
      ["anjungmom", "맘카페_평택안포맘"],
      ["tlgmdaka0", "맘카페_시맘수"],
      ["naese", "맘카페_중리사랑방"],
      ["mygodsend", "맘카페_화성남양애"],
      ["cjsam", "맘카페_순광맘"],
      ["seosanmom", "맘카페_서산맘"],
    ];
    for (const [id, name] of cafeMap) {
      if (
        referrer.includes(`cafe.naver.com/${id}`) ||
        referrer.includes(`/cafes/${id}`)
      ) {
        setClickSource(name);
        return;
      }
    }
    if (referrer.includes("cafe.naver.com"))
      setClickSource("네이버카페_referrer");
  }, [searchParams]);

  useEffect(() => {
    const heroBtn = document.getElementById("hero-cta-btn");
    const formTitle = document.getElementById("consult-form-title");
    if (!heroBtn || !formTitle) return;

    const update = () => {
      const passedHero = heroBtn.getBoundingClientRect().bottom <= 0;
      const formStillAhead = formTitle.getBoundingClientRect().top >= window.innerHeight;
      setShowFloating(passedHero && formStillAhead);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const layoutObserver = new ResizeObserver(update);
    if (landingRef.current) layoutObserver.observe(landingRef.current);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      layoutObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!done && !showPrivacyModal) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    const getControls = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled)') ?? []);
    getControls()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDone(false); setShowPrivacyModal(false); }
      if (event.key !== "Tab") return;
      const controls = getControls();
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [done, showPrivacyModal]);

  const scrollToForm = () => {
    document
      .getElementById("consult-form")
      ?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  const formatContact = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };

  const validateContact = (contact: string) => {
    const cleaned = contact.replace(/[-\s]/g, "");
    if (!cleaned.length) {
      setContactError("");
      return true;
    }
    if (!/^(010\d{8}|011\d{7,8})$/.test(cleaned)) {
      setContactError("010 또는 011로 시작하는 휴대전화번호를 끝까지 입력해주세요.");
      return false;
    }
    setContactError("");
    return true;
  };

  const handleSubmit = async () => {
    if (loading || done || !isFormValid) return;
    setLoading(true);
    setSubmitError("");
    try {
      let click_source = "주부_랜딩페이지";
      if (clickSource) {
        const idx = clickSource.indexOf("_");
        const major = idx === -1 ? clickSource : clickSource.slice(0, idx);
        const sojae = idx === -1 ? "" : clickSource.slice(idx + 1);
        click_source = sojae
          ? `${major}_주부_랜딩페이지_${sojae}`
          : `${major}_주부_랜딩페이지`;
      }
      const getCookie = (n: string) =>
        document.cookie.split("; ").find((r) => r.startsWith(n + "="))?.split("=")[1];
      const eventId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          contact: formData.contact,
          residence: formData.residence || null,
          education: formData.education,
          hope_course: formData.hope_course,
          reason: formData.reason,
          fast_consultation: fastConsult,
          preferred_times: preferredTimes,
          consult_time_memo: formData.memo || null,
          click_source,
          event_id: eventId,
          fbp: getCookie("_fbp") || null,
          fbc: getCookie("_fbc") || null,
          event_source_url: window.location.href,
          // 엔비티 리워드 광고 유입 시 매체가 붙여준 click_key (포스트백용). 없으면 null → 미발송
          // URLSearchParams 는 '+' 를 공백으로 바꾸므로 원본 쿼리에서 직접 읽는다.
          click_key: readClickKeyFromSearch(window.location.search),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "저장에 실패했습니다.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer = (window as any).dataLayer || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer.push({ event: "form_submit_success", event_id: eventId });
      setDone(true);
      setFormData({ name: "", contact: "", residence: "", education: "", hope_course: "사회복지사", reason: "", memo: "" });
      setPreferredTimes([]);
      setFastConsult(false);
      setPrivacyAgreed(false);
    } catch (e) {
      setSubmitError(
        e instanceof Error
          ? e.message
          : "저장에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name.trim().length > 0 &&
    /^(010\d{8}|011\d{7,8})$/.test(formData.contact.replace(/[-\s]/g, "")) &&
    formData.education.length > 0 &&
    formData.hope_course.length > 0 &&
    privacyAgreed;

  return (
    <main ref={landingRef} className={`${styles.container} ${styles.trustLanding}`}>
      <LandingSections onConsult={scrollToForm} />

      <section className={`${styles.formSection} ${styles.warmConsultSection}`} id="consult-section" aria-labelledby="consult-title">
        <ConsultationIntro onConsult={scrollToForm} />
        <div className={styles.consultFormShell}>
        <form id="consult-form" className={styles.formCard} onSubmit={(event) => { event.preventDefault(); void handleSubmit(); }} aria-busy={loading}>
          <div className={styles.formHeader}><h3 id="consult-form-title" className={styles.formTitle}>내 상황에 맞는 준비 방법을<br />물어보세요.</h3><p className={styles.selectedCourse}>상담 과정 · 사회복지사 2급</p></div>
          <div className={styles.formBody}><div className={styles.formBodyInner}>
            <div className={styles.formRequiredSection}><div className={styles.formFieldGroup}>
              <div className={styles.formField}><label htmlFor="consult-name" className={styles.inputLabel}>이름 <span>필수</span></label><input id="consult-name" name="name" type="text" className={styles.formInput} placeholder="성함을 입력해주세요" value={formData.name} required maxLength={40} autoComplete="name" onChange={(event) => setFormData({ ...formData, name: event.target.value })} /></div>
              <div className={styles.formField}><label htmlFor="consult-contact" className={styles.inputLabel}>연락처 <span>필수</span></label><input id="consult-contact" name="contact" type="tel" inputMode="tel" autoComplete="tel" className={styles.formInput} placeholder="연락받으실 휴대전화번호" required maxLength={13} value={formData.contact} aria-invalid={!!contactError} aria-describedby={contactError ? "contact-error" : undefined} onChange={(event) => { const value = formatContact(event.target.value); setFormData({ ...formData, contact: value }); setContactError(""); }} onBlur={() => validateContact(formData.contact)} />{contactError && <p id="contact-error" className={styles.errorMsg} role="alert">{contactError}</p>}</div>
              <div className={styles.formField}><label htmlFor="consult-education" className={styles.inputLabel}>최종학력 <span>필수</span></label><select id="consult-education" name="education" required className={styles.formSelect} value={formData.education} aria-describedby="education-help" onChange={(event) => setFormData({ ...formData, education: event.target.value })}><option value="">최종학력을 선택해주세요</option><option value="고졸">고졸</option><option value="전문대졸">전문대졸</option><option value="대졸">대졸</option><option value="대학원 이상">대학원 이상</option><option value="기타">그 외 · 상담 시 확인</option></select><p id="education-help" className={styles.formHelp}>최종학력에 따라 과정이 조금씩 달라져요!</p></div>
            </div></div>
            <div className={styles.optionalField}><div className={styles.optionalFieldHead}><p id="preferred-time-label" className={styles.optionalFieldLabel}>연락받기 편한 시간 <span className={styles.optionalHint}>선택</span></p><p className={styles.optionalFieldHelp}>복수 선택 가능 · 선택하지 않으셔도 상담받을 수 있습니다.</p></div><div className={styles.timeGrid} role="group" aria-labelledby="preferred-time-label">{["09:00~13:00", "14:00~17:00", "17:00~19:00"].map(time => { const selected = preferredTimes.includes(time); return <button type="button" key={time} aria-pressed={selected} className={`${styles.timeChip} ${selected ? styles.timeChipSel : ""}`} onClick={() => setPreferredTimes(previous => selected ? previous.filter(value => value !== time) : [...previous, time])}>{time}</button>; })}</div></div>
            <div className={styles.visibleFastConsult}><label className={styles.fastConsultRow}><input type="checkbox" name="fast_consultation" className={styles.reasonCheckbox} checked={fastConsult} onChange={(event) => setFastConsult(event.target.checked)} /><span className={styles.fastConsultLabel}>빠른 상담을 원합니다.</span><span className={styles.optionalHint}>선택</span></label><p className={styles.fastConsultDesc}>빠른 연락을 원하시면 체크해주세요.</p></div>
            <details className={styles.additionalFields}><summary>미리 전달할 내용 <span>선택</span></summary><div className={styles.additionalFieldsBody}>
              <div className={styles.formField}><label htmlFor="consult-residence" className={styles.inputLabel}>거주 지역</label><input id="consult-residence" name="residence" type="text" className={styles.formInput} placeholder="예: 서울 도봉구" maxLength={60} value={formData.residence} onChange={(event) => setFormData({ ...formData, residence: event.target.value })} /><p className={styles.formHelp}>실습 준비 안내에 참고합니다.</p></div>
              <fieldset className={styles.reasonSection}><legend className={styles.reasonLabel}>취득사유</legend><div className={styles.reasonGroup}>{["즉시취업", "이직", "미래준비", "취미"].map(option => { const selected = formData.reason.split(", ").includes(option); return <label key={option} className={`${styles.reasonItem} ${selected ? styles.reasonItemSel : ""}`}><input type="checkbox" className={styles.reasonCheckbox} checked={selected} onChange={() => { const current = formData.reason.split(", ").filter(Boolean); setFormData({ ...formData, reason: (selected ? current.filter(value => value !== option) : [...current, option]).join(", ") }); }} />{option}</label>; })}</div></fieldset>
              <div className={styles.formField}><label htmlFor="consult-memo" className={styles.inputLabel}>상담 일정·문의 메모 <span className={styles.optionalHint}>25자 이내</span></label><input id="consult-memo" name="memo" type="text" className={styles.memoInput} maxLength={25} placeholder="편한 요일이나 궁금한 점을 남겨주세요" value={formData.memo} onChange={(event) => setFormData({ ...formData, memo: event.target.value })} /></div>
            </div></details>
          </div></div>
          <div className={styles.consentControls}><label className={styles.consentLabel}><input name="privacy" type="checkbox" required checked={privacyAgreed} onChange={(event) => setPrivacyAgreed(event.target.checked)} /><span>개인정보 수집 및 이용에 동의합니다. <b>필수</b></span></label><button type="button" className={styles.formAgreeLink} onClick={() => setShowPrivacyModal(true)}>내용 보기</button></div>
          {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}
          <button type="submit" className={styles.formSubmit} disabled={!isFormValid || loading || done}>{loading ? "신청 내용을 접수하고 있습니다..." : "내 준비 방법 상담 신청하기"}</button>
          <p className={styles.formResponseNote}>상담으로 필요한 기간과 비용을 확인하신 뒤,<br />시작 여부를 결정하셔도 괜찮아요.</p>
          <p className={styles.consultContactNote}>신청 후 한평생 담당자가 전화로 연락드려요.</p>
          <div className={styles.formPhoneWrap}><p className={styles.formPhoneNote}>직접 전화로 상담하고 싶으신가요?</p><a href="tel:070-8652-2574" className={styles.formPhoneBtn}><span>전화 상담하기</span><span>070-8652-2574</span></a></div>
        </form>
        </div>
      </section>

      {/* 제출 완료 팝업 */}
      {done && <ConsultationSuccess onClose={() => setDone(false)} />}

      {/* 개인정보처리방침 모달 */}
      {showPrivacyModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className={styles.modalBox}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consult-privacy-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <p className={styles.modalTitle} id="consult-privacy-title">개인정보 수집 및 이용</p>
              <button
                className={styles.closeBtn}
                onClick={() => setShowPrivacyModal(false)}
                aria-label="닫기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.modalScroll}>
              <p className={styles.modalItem}>
                <strong>1. 개인정보 수집 및 이용 목적</strong>
                사회복지사 자격 취득 상담 진행, 문의사항 응대
                <br />
                개인정보는 상담 서비스 제공을 위한 목적으로만 수집 및 이용되며,
                동의 없이 제3자에게 제공되지 않습니다
              </p>
              <p className={styles.modalItem}>
                <strong>2. 수집 및 이용하는 개인정보 항목</strong>
                필수 - 이름, 연락처(휴대전화번호), 최종학력, 상담 과정
                <br />
                선택 - 거주 지역, 취득사유, 빠른 상담 여부, 상담 선호 시간, 상담 메모
              </p>
              <p className={styles.modalItem}>
                <strong>3. 보유 및 이용 기간</strong>
                법령이 정하는 경우를 제외하고는 수집일로부터 1년 또는 동의 철회
                시까지 보유 및 이용합니다.
              </p>
              <p className={styles.modalItem}>
                <strong>4. 동의 거부 권리</strong>
                신청자는 동의를 거부할 권리가 있습니다. 단, 동의를 거부하는 경우
                상담 서비스 이용이 제한됩니다.
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* 플로팅 CTA 버튼 */}
      <button
        type="button"
        className={`${styles.floatingBtn} ${!showFloating ? styles.floatingBtnHidden : ""}`}
        hidden={done || showPrivacyModal}
        aria-hidden={!showFloating}
        tabIndex={showFloating ? 0 : -1}
        onClick={scrollToForm}
      >
        나에게 맞는 준비 방법 알아보기
      </button>
    </main>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingContent />
    </Suspense>
  );
}
