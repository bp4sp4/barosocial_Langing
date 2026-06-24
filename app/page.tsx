"use client";

import Image from "next/image";
import { useState, useEffect, Suspense, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./landing.module.css";
import Footer from "./components/Footer";

const REAL_IMAGES = [
  "/main_01.png",
  "/main_02.png",
  "/main_03.png",
  "/main_04.png",
];
const CONFIRM_IMAGES = [
  "/confirm_01.png",
  "/confirm_02.png",
  "/confirm_03.png",
  "/confirm_04.png",
  "/confirm_05.png",
];

const REVIEWS = [
  {
    label: "47세 경력단절 주부, 재취업 성공",
    title: "막막했던 재취업에\n자신감이 생겼어요.",
    name: "김*선 님",
    body: "아이들을 키우느라 오랫동안 일을 쉬어 재취업이 가능할지 걱정이 많았습니다. 나이도 있고 경력 공백도 길어서 자신감이 많이 떨어진 상태였는데, 사회복지사 자격증을 취득한 후 관련 분야로 취업까지 하게 되었어요. 그동안의 고민이 무색할 만큼 새로운 시작을 할 수 있었습니다.",
    img: "/profile2.jpg",
  },
  {
    label: "65세 정년퇴직 후 취업 성공",
    title: "나이가 걸림돌이\n되지 않았어요.",
    name: "김*숙 님",
    body: "요즘은 다들 너무 건강해요~ 정년퇴직 후 앞으로 어떻게 시간을 보내야 할지 고민이 많았습니다. 단순히 쉬기보다는 보람 있는 일을 하고 싶어 사회복지사 자격증에 도전했어요. 나이 때문에 걱정도 했지만 취득 후 관련 시설에 취업까지 하게 되면서 제2의 인생을 시작한 기분입니다.",
    img: "/profile3.jpg",
  },
  {
    label: "52세 퇴직 준비자도 취득 성공",
    title: "노후 대비가 한결 든든\n해졌습니다.",
    name: "최*수 님",
    body: "퇴직이 가까워지면서 앞으로 무엇을 해야 할지 고민이 많았습니다. 사회복지 분야에 관심은 있었지만 나이가 많아 시작하기 망설여졌는데, 생각보다 많은 분들이 비슷한 상황에서 준비하고 계시더라고요. 덕분에 용기를 내어 시작했고 만족스러운 결과를 얻었습니다.",
    img: "/profile4.jpg",
  },
  {
    label: "37세 워킹맘도 취득 성공",
    title: "육아와 병행할 수\n있었어요.",
    name: "정*미 님",
    body: "아이를 키우면서 일을 하고 있어 시간을 내기가 쉽지 않았습니다. 그래서 계속 미루고 있었는데, 온라인으로 진행할 수 있어 부담이 적었고 일정 관리도 도움을 받아 끝까지 완주할 수 있었습니다. 저처럼 시간이 부족한 분들에게 큰 도움이 될 것 같아요.",
    img: "/profile05.jpg",
  },
  {
    label: "58세, 친구와 함께 도전",
    title: "혼자가 아니라서\n끝까지 할 수 있었어요.",
    name: "신*자 님",
    body: "50대 후반이 되니 노후 준비에 대한 고민이 많아졌습니다. 혼자 시작하기엔 망설여졌는데 친구와 함께 도전하자는 이야기가 나와 용기를 냈어요. 서로 응원하며 공부하다 보니 어느새 둘 다 사회복지사 자격증을 취득하게 되었고, 지금은 관련 분야 취업도 준비하고 있습니다.",
    img: "/profile6.jpg",
  },
  {
    label: "57세 제조업 종사자도 취득 성공",
    title: "퇴직 이후를 준비할 수\n있었습니다.",
    name: "김*성 님",
    body: "30년 넘게 제조업 현장에서 일하면서 정년 이후가 가장 큰 고민이었습니다. 몸을 쓰는 일은 점점 부담이 커지고 있었고, 앞으로 할 수 있는 일을 찾다가 사회복지사에 도전하게 되었어요. 처음에는 공부가 걱정됐지만 생각보다 잘 따라갈 수 있었고, 미래에 대한 불안도 많이 줄었습니다.",
    img: "/profile7.jpg",
  },
];

const PROCESS = [
  { step: "STEP 1", title: "무료 상담 신청", img: "/process01.png" },
  { step: "STEP 2", title: "학습 설계", img: "/process02.png" },
  { step: "STEP 3", title: "온라인 수강", img: "/process03.png" },
  { step: "STEP 4", title: "현장 실습", img: "/process04.png" },
  { step: "STEP 5", title: "자격증 발급 신청", img: "/process05.png" },
  {
    step: "STEP 6",
    title: "여성인력개발센터\n연계 취업",
    img: "/process06.png",
  },
];

const GIFTS = [
  {
    pill: "사은품 1",
    img: "/gift01.png",
    text: "한평생직업훈련센터\n수강권 40만원",
  },
  { pill: "사은품 2", img: "/gift02.png", text: "강의 교재\n무료 제공" },
];

const BENEFITS = [
  { pill: "혜택 1", img: "/gift03.png", text: "미이수 시\n전액 환급 보장" },
  { pill: "혜택 2", img: "/gift04.png", text: "수강료 최대 70%\n장학지원" },
  { pill: "혜택 3", img: "/gift05.png", text: "1:1 실습처\n매칭 보장" },
  {
    pill: "혜택 4",
    img: "/gift06.png",
    text: "여성인력개발센터\n연계 취업 지원",
  },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "고등학교만 나왔는데 가능할까요?",
    a: (
      <>
        네 가능합니다. 최종학력이 <strong>고등학교 졸업 이상</strong>이라면
        누구나 사회복지사 자격증을 준비할 수 있습니다.
      </>
    ),
  },
  {
    q: "비전공자도 가능한가요?",
    a: (
      <>
        네, <strong>사회복지사는 전공 상관없이 준비</strong>할 수 있는
        자격증입니다.
      </>
    ),
  },
  {
    q: "직장인도 수강할 수 있나요?",
    a: (
      <>
        수업은<strong>100% 온라인</strong>으로 진행되기 때문에 직장 다니시는
        분들도 집에서 간단히 준비할 수 있습니다.
      </>
    ),
  },
  {
    q: "실습은 어떻게 하나요?",
    a: (
      <>
        1:1 담당자가 <strong>거주 지역 기반으로 실습처 매칭</strong>을
        도와드립니다.
      </>
    ),
  },
  {
    q: "비용은 얼마인가요?",
    a: (
      <>
        <strong>최종학력에 따라</strong> 비용이 조금씩 달라져서{" "}
        <strong>무료상담</strong> 후 <strong>개인별 맞춤 비용을 안내</strong>
        드립니다.
      </>
    ),
  },
  {
    q: "자격증 따고 취업이 걱정돼요.",
    a: (
      <>
        <strong>여성인력개발센터와 공식 협약</strong>으로 취업 연계 지원합니다.
      </>
    ),
  },
  {
    q: "지금 시작해도 늦지 않았을까요?",
    a: (
      <>
        네, 실제로 <strong>40대~50대 주부님들이 가장 많이 준비</strong>하고
        계시며 <strong>노후대비와 실제 재취업</strong>을 위해 시작하시는 분들이
        더욱 늘어나고 있습니다.
      </>
    ),
  },
];

function ConfirmCarousel() {
  return (
    <div className={styles.confirmCarouselWrap}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        centeredSlides={true}
        spaceBetween={12}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className={styles.swiper}
      >
        {CONFIRM_IMAGES.map((src, i) => (
          <SwiperSlide key={i} className={styles.confirmSlide}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`후기 ${i + 1}`}
              className={styles.confirmImg}
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ImageCarousel() {
  return (
    <div className={styles.carouselWrap}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        centeredSlides={true}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className={styles.swiper}
      >
        {REAL_IMAGES.map((src, i) => (
          <SwiperSlide key={i} className={styles.mainSlide}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`슬라이드 ${i + 1}`}
              className={styles.carouselImg}
              loading="eager"
              fetchPriority="high"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const formatClickSource = (
  utmSource: string,
  materialId: string | null,
  blogId: string | null = null,
  cafeId: string | null = null,
): string => {
  const sourceMap: { [key: string]: string } = {
    daangn: "당근",
    insta: "인스타",
    facebook: "페이스북",
    google: "구글",
    youtube: "유튜브",
    kakao: "카카오",
    naver: "네이버",
    naverblog: "네이버블로그",
    toss: "토스",
    mamcafe: "맘카페",
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
    hope_course: "",
    reason: "",
    memo: "",
  });
  // 빠른 상담 토글 (기본 OFF)
  const [fastConsult, setFastConsult] = useState(false);
  // 상담 선호 시간 (복수선택)
  const [preferredTimes, setPreferredTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [countdown, setCountdown] = useState("6일 14:22:23");

  useEffect(() => {
    const target = Date.now() + ((6 * 24 + 14) * 3600 + 22 * 60 + 23) * 1000;
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      setCountdown(`${d}일 ${pad(h)}:${pad(m)}:${pad(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
    const formSection = document.getElementById("consult-form");
    if (!heroBtn || !formSection) return;

    let heroVisible = true;
    let formVisible = false;

    const update = () => setShowFloating(!heroVisible && !formVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    const formObserver = new IntersectionObserver(
      ([entry]) => {
        formVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );

    heroObserver.observe(heroBtn);
    formObserver.observe(formSection);
    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  const scrollToForm = () => {
    document
      .getElementById("consult-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    if (!cleaned.startsWith("010") && !cleaned.startsWith("011")) {
      setContactError("010 또는 011로 시작하는 번호를 입력해주세요");
      return false;
    }
    setContactError("");
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
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
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          residence: formData.residence || null,
          education: formData.education,
          hope_course: formData.hope_course,
          reason: formData.reason,
          fast_consultation: fastConsult,
          preferred_times: preferredTimes,
          consult_time_memo: formData.memo || null,
          click_source,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "저장에 실패했습니다.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer = (window as any).dataLayer || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer.push({ event: "form_submit_success" });
      setDone(true);
    } catch (e) {
      alert(
        e instanceof Error
          ? e.message
          : "저장에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name.length > 0 &&
    formData.contact.replace(/[-\s]/g, "").length >= 10 &&
    !contactError &&
    formData.education.length > 0 &&
    formData.hope_course.length > 0 &&
    privacyAgreed;

  return (
    <div className={styles.container}>
      {/* 첫번째 영역 */}

      <div className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mainhero.png"
          alt="여성인력개발센터 공식 협약기관"
          className={styles.heroBadge}
          loading="eager"
        />
        <div className={styles.heroTextWrap}>
          <p className={styles.heroTitle}>혼자 준비하지마세요</p>
          <p className={styles.heroCourse}>
            사회복지사 2급
            <br />
            취득부터 취업까지
          </p>
          <p className={styles.heroCenterName}>여성인력개발센터와 공식 협약</p>
        </div>
        <div className={styles.allcareList}>
          {(
            [
              {
                key: "point1",
                tag: (
                  <>
                    <span className={styles.allcarePointDark}>
                      교육비&nbsp;
                    </span>
                    <span className={styles.allcarePointOrange}>
                      부담은 줄이고,&nbsp;
                    </span>
                    <span className={styles.allcarePointDark}>
                      기회는&nbsp;{" "}
                    </span>
                    <span className={styles.allcarePointOrange}>더 크게!</span>
                  </>
                ) as ReactNode,
                text: (
                  <>
                    수강료&nbsp;
                    <span className={styles.allcareTextOrange}>최대 70%</span>
                    &nbsp;장학지원
                  </>
                ) as ReactNode,
                desc: "교육과정 수강료의 최대 70%까지\n지원받아 부담없이 시작할 수 있습니다.",
                alt: "수강료 70% 지원",
                img: "/allcare_01.png",
              },

              {
                key: "point3",
                tag: (
                  <>
                    <span className={styles.allcarePointDark}>
                      취업까지 한 번에, &nbsp;
                    </span>
                    <span className={styles.allcarePointOrange}>
                      전문가가 함께
                    </span>
                    <span className={styles.allcarePointDark}>해요!</span>
                  </>
                ) as ReactNode,
                text: (
                  <>
                    <span className={styles.allcareTextOrange}>1:1 실습처</span>
                    &nbsp;매칭보장
                  </>
                ) as ReactNode,
                desc: "이력서부터 면접까지 1:1 맞춤 취업\n컨설팅으로 시작부터 끝까지 체계적으로\n지원합니다.",
                alt: "취업 컨설팅",
                img: "/allcare_03.png",
              },
              {
                key: "point4",
                tag: (
                  <>
                    <span className={styles.allcarePointOrange}>
                      끝까지 책임지는 교육, &nbsp;
                    </span>
                    <span className={styles.allcarePointDark}>
                      안심하고 시작하세요!
                    </span>
                  </>
                ) as ReactNode,
                text: (
                  <>
                    미이수 시&nbsp;
                    <span className={styles.allcareTextOrange}>환급제도</span>
                  </>
                ) as ReactNode,
                desc: "교육 이수에 어려움이 있을 경우, 자체\n환급제도를 통해 수강료를 일부 또는 전액\n환급해드리는 제도를 운영하고 있습니다.",
                alt: "미이수시 환급제도",
                img: "/allcare_04.png",
              },
            ] as {
              key: string;
              tag: ReactNode;
              text: ReactNode;
              desc: string;
              alt: string;
              img: string;
            }[]
          ).map(({ key, tag, text, desc, alt, img }) => (
            <div key={key} style={{ width: "100%" }}>
              <div className={styles.allcareItem}>
                <div className={styles.allcareLeft}>
                  <div className={styles.allcarePoint}>{tag}</div>
                  <p className={styles.allcareText}>{text}</p>
                  <p className={styles.allcareDesc}>{desc}</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={alt}
                  className={styles.allcareImg}
                  loading="eager"
                />
              </div>
            </div>
          ))}
        </div>
        <svg
          className={styles.heroChevron}
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M1.77051 3.50555C1.77051 3.85351 1.90907 4.18742 2.15503 4.43353L9.58014 11.8586C9.82626 12.1046 10.1602 12.2432 10.5081 12.2432C10.8559 12.243 11.1901 12.1046 11.4361 11.8586L18.8599 4.43353C19.0989 4.186 19.2321 3.85477 19.2291 3.51068C19.226 3.16668 19.0878 2.83753 18.8445 2.59424C18.6013 2.351 18.2721 2.21283 17.9281 2.20972C17.584 2.20673 17.2515 2.33854 17.004 2.57758L10.5081 9.07471L4.01099 2.57758C3.76494 2.33168 3.43087 2.19441 3.08301 2.19434C2.73518 2.19434 2.40112 2.33179 2.15503 2.57758C1.90911 2.82357 1.77066 3.15773 1.77051 3.50555Z"
            fill="#FF751F"
          />
          <path
            d="M1.77051 10.0681C1.77051 10.416 1.90907 10.7499 2.15503 10.996L9.58014 18.4211C9.82626 18.6671 10.1602 18.8057 10.5081 18.8057C10.8559 18.8055 11.1901 18.6671 11.4361 18.4211L18.8599 10.996C19.0989 10.7485 19.2321 10.4173 19.2291 10.0732C19.226 9.72918 19.0878 9.40003 18.8445 9.15674C18.6013 8.9135 18.2721 8.77533 17.9281 8.77222C17.584 8.76923 17.2515 8.90104 17.004 9.14008L10.5081 15.6372L4.01099 9.14008C3.76494 8.89418 3.43087 8.75691 3.08301 8.75684C2.73518 8.75684 2.40112 8.89429 2.15503 9.14008C1.90911 9.38607 1.77066 9.72023 1.77051 10.0681Z"
            fill="#FF751F"
          />
        </svg>
        <button
          id="hero-cta-btn"
          className={`${styles.sectionFinalBtn} ${styles.heroCta}`}
          onClick={scrollToForm}
        >
          지금 무료 상담 신청
        </button>
        <div className={styles.liveTicker}>
          <div className={styles.liveTickerTrack}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className={styles.liveTickerItem}>
                🔴 LIVE 오늘 상담 신청 7명 / 선착순 30명 상담 진행
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 후기 섹션 */}
      <div className={styles.reviewSection}>
        <div className={styles.reviewTitleWrap}>
          <p className={styles.reviewTitleLine1}>
            이미 <span className={styles.reviewHl1}>7000명</span>의 학습자가
          </p>
          <p className={styles.reviewTitleLine2}>
            <span className={styles.reviewHl2}>한평생을 선택</span>했습니다
          </p>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={8}
          className={styles.reviewSwiper}
        >
          {REVIEWS.map((r, i) => (
            <SwiperSlide key={i} className={styles.reviewSlide}>
              <div className={styles.reviewCard}>
                <div className={styles.reviewCardTop}>
                  <div className={styles.reviewCardInfo}>
                    <div className={styles.reviewCardTexts}>
                      <p className={styles.reviewLabel}>{r.label}</p>
                      <p className={styles.reviewTitle}>{r.title}</p>
                    </div>
                    <p className={styles.reviewName}>{r.name}</p>
                  </div>
                  <div className={styles.reviewImgBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.img}
                      alt="후기 프로필"
                      className={styles.reviewImg}
                      loading="eager"
                    />
                    <div className={styles.reviewImgBlur} aria-hidden="true" />
                  </div>
                </div>
                <p className={styles.reviewBody}>{r.body}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 비교 섹션 - 무엇이 다른가요? */}
      <div className={styles.diffSection}>
        <div className={styles.diffBg} aria-hidden="true" />
        <div className={styles.diffBadge}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/angelwing.png"
            alt="여성인력개발센터 공식 협약기관"
            className={styles.diffWing}
            loading="eager"
          />
          <p className={styles.diffBadgeText}>
            여성인력개발센터
            <br />
            공식 협약기관
          </p>
        </div>

        <div className={styles.diffTitleWrap}>
          <p className={styles.diffTitleLight}>다른곳과</p>
          <p className={styles.diffTitleBold}>무엇이 다른가요?</p>
        </div>

        <div className={styles.diffCompare}>
          <div className={styles.diffOther}>
            <p className={styles.diffOtherTitle}>타 교육원 수강</p>
            <ul className={styles.diffOtherList}>
              {[
                "자격증 취득후,\n취업은 알아서",
                "실습처도 혼자\n알아보기",
                "단순 학습 지원",
              ].map((t) => (
                <li key={t} className={styles.diffOtherItem}>
                  <span className={styles.diffBullet} aria-hidden="true">
                    •
                  </span>
                  <span className={styles.diffOtherItemText}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.diffOurs}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/winglogo.png"
              alt="한평생그룹"
              className={styles.diffLogo}
              loading="eager"
            />
            <div className={styles.diffOursList}>
              {[
                { img: "/wing01.png", text: "자격증 취득 후\n센터 연계 취업" },
                { img: "/wing02.png", text: "1:1 담당자\n매칭보장" },
                { img: "/wing03.png", text: "장학지원 70%\n+전액환급" },
              ].map(({ img, text }) => (
                <div key={text} className={styles.diffOursItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt=""
                    className={styles.diffOursIcon}
                    loading="eager"
                  />
                  <p className={styles.diffOursText}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 프로세스 섹션 - 자격증 취득 프로세스 */}
      <div className={styles.processSection}>
        <p className={styles.processTitle}>자격증 취득 프로세스</p>
        <div className={styles.processList}>
          {PROCESS.map(({ step, title, img }, i) => (
            <div key={step} className={styles.processItem}>
              <div className={styles.processItemLeft}>
                <span className={styles.processBadge}>{step}</span>
                <p className={styles.processStepTitle}>{title}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={title}
                className={styles.processImg}
                loading="eager"
              />
              {i < PROCESS.length - 1 && (
                <span className={styles.processChevron} aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M1.34863 2.6709C1.34863 2.93601 1.4542 3.19041 1.6416 3.37793L7.29883 9.03516C7.48635 9.22256 7.74075 9.32812 8.00586 9.32812C8.27087 9.32801 8.52547 9.22252 8.71289 9.03516L14.3691 3.37793C14.5513 3.18933 14.6527 2.93697 14.6504 2.6748C14.6481 2.41271 14.5427 2.16193 14.3574 1.97656C14.1721 1.79124 13.9212 1.68596 13.6592 1.68359C13.397 1.68132 13.1437 1.78174 12.9551 1.96387L8.00586 6.91406L3.05566 1.96387C2.8682 1.77652 2.61367 1.67193 2.34863 1.67188C2.08362 1.67188 1.8291 1.7766 1.6416 1.96387C1.45423 2.15129 1.34875 2.40589 1.34863 2.6709Z"
                      fill="#FF4000"
                    />
                    <path
                      d="M1.34863 7.6709C1.34863 7.93601 1.4542 8.19041 1.6416 8.37793L7.29883 14.0352C7.48635 14.2226 7.74075 14.3281 8.00586 14.3281C8.27087 14.328 8.52547 14.2225 8.71289 14.0352L14.3691 8.37793C14.5513 8.18933 14.6527 7.93697 14.6504 7.6748C14.6481 7.41271 14.5427 7.16193 14.3574 6.97656C14.1721 6.79124 13.9212 6.68596 13.6592 6.68359C13.397 6.68131 13.1437 6.78174 12.9551 6.96387L8.00586 11.9141L3.05566 6.96387C2.8682 6.77652 2.61367 6.67193 2.34863 6.67188C2.08362 6.67188 1.8291 6.7766 1.6416 6.96387C1.45423 7.15129 1.34875 7.40589 1.34863 7.6709Z"
                      fill="#FF4000"
                    />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 인증 섹션 - 협약기관 / 자격증 / 수강생 사례 */}
      <div className={styles.credSection}>
        <div className={styles.credTitleWrap}>
          <p className={styles.credTitleLight}>사회복지사 취득부터 취업까지,</p>
          <p className={styles.credTitleBold}>검증된 이유</p>
        </div>
        <div className={styles.credBadgeList}>
          <div className={styles.credBadgeBox}>
            🏛️ 여성인력개발센터 공식 협약기관
          </div>
          <div className={styles.credBadgeBox}>
            🏛️ 교육부 평가인정 학점은행제 교육기관
          </div>
          <div className={styles.credBadgeBox}>
            🏛️ 사회복지사 자격증 보건복지부장관 발급
          </div>
        </div>

        <div className={styles.credCertCard}>
          <span className={styles.credPill}>자격증 취득</span>
          <div className={styles.credCertInner}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/section3_03.png"
              alt="자격증 취득"
              className={styles.main3CertImg}
              loading="eager"
            />
            <div className={styles.main3CertRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/section3_04.jpg"
                alt="보건복지부"
                className={styles.main3CertLogo}
                loading="eager"
              />
              <p className={styles.main3CertText}>
                <span className={styles.main3MethodNormal}>발급 </span>
                <span className={styles.main3CertTextBold}>
                  정식 국가자격증
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.credCaseWrap}>
          <span className={styles.credPill}>실제 수강생 사례</span>
          <ConfirmCarousel />
        </div>
      </div>

      {/* 혜택 섹션 - 지금 신청하면 받는 혜택 */}
      <div className={styles.benefitSection}>
        <p className={styles.benefitTitle}>
          지금 신청하면 받는 혜택{"\n"}선착순 30명
        </p>
        <div className={styles.benefitGrid}>
          {BENEFITS.map(({ pill, img, text }) => (
            <div key={pill} className={styles.benefitCard}>
              <span className={styles.benefitPill}>{pill}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={text}
                className={styles.benefitImg}
                loading="eager"
              />
              <p className={styles.benefitText}>{text}</p>
            </div>
          ))}

          <div className={styles.benefitGiftCard}>
            <div className={styles.benefitGiftItem}>
              <span className={styles.benefitPill}>{GIFTS[0].pill}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GIFTS[0].img}
                alt={GIFTS[0].text}
                className={styles.benefitGiftImg}
                loading="eager"
              />
              <p className={styles.benefitText}>{GIFTS[0].text}</p>
            </div>
            <span className={styles.benefitPlus} aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8.03161 1.0166C8.50835 1.01796 8.89415 1.40595 8.89303 1.88259L8.88042 7.11997L14.1184 7.10826C14.5945 7.10754 14.9818 7.49157 14.9834 7.96794C14.9845 8.44448 14.5994 8.83234 14.1229 8.83393L8.87591 8.84654L8.8624 14.156C8.86087 14.6325 8.473 15.0177 7.99646 15.0166C7.52017 15.0148 7.1339 14.6271 7.13504 14.1506L7.14945 8.85105L1.84933 8.86457C1.37313 8.86532 0.984996 8.48028 0.983401 8.00398C0.982299 7.52753 1.36842 7.13967 1.84483 7.138L7.15306 7.12358L7.16657 1.87809C7.16792 1.40187 7.55502 1.01588 8.03161 1.0166Z"
                  fill="#FF4000"
                />
              </svg>
            </span>
            <div className={styles.benefitGiftItem}>
              <span className={styles.benefitPill}>{GIFTS[1].pill}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GIFTS[1].img}
                alt={GIFTS[1].text}
                className={styles.benefitGiftImg}
                loading="eager"
              />
              <p className={styles.benefitText}>{GIFTS[1].text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 혜택 바 섹션 */}
      <div className={styles.benefitBar}>
        <p className={styles.benefitBarTitle}>총 260만원 상당 혜택</p>
        <div className={styles.benefitBarRow}>
          <span className={styles.benefitBarItem}>
            <span className={styles.benefitBarOrange}>{countdown}</span> 남음
          </span>
          <span className={styles.benefitBarItem}>
            상담 진행 <span className={styles.benefitBarOrange}>23</span>/30명
          </span>
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className={styles.faqSection}>
        <div className={styles.faqTitleWrap}>
          <p className={styles.faqTitleBig}>FAQ</p>
          <p className={styles.faqTitleSub}>자주 묻는 질문</p>
        </div>
        <div className={styles.faqCard}>
          {FAQS.map((f, i) => (
            <div key={i} className={styles.faqItem}>
              <div className={styles.faqQ}>
                <span className={styles.faqQMark}>Q.</span>
                <span className={styles.faqQText}>{f.q}</span>
              </div>
              <div className={styles.faqA}>
                <span className={styles.faqAMark}>A.</span>
                <span className={styles.faqAText}>{f.a}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 무료상담 신청 폼 섹션 */}
      <div className={styles.formSection} id="consult-form">
        <p className={styles.formSectionTitle}>
          걱정하지 마세요,
          <br />
          생각보다 많은 분들이 해내고 있습니다.
        </p>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <p className={styles.formTitle}>무료상담 신청</p>
          </div>

          <div className={styles.formBody}>
            <div className={styles.formBodyInner}>
              <div className={styles.formRequiredSection}>
                <p className={styles.formRequiredLabel}>
                  필수 사항<span className={styles.formRequiredStar}>*</span>
                </p>

                <div className={styles.formFieldGroup}>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="이름"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />

                  <div className={styles.formInputWrap}>
                    <input
                      type="tel"
                      className={styles.formInput}
                      placeholder="연락처"
                      value={formData.contact}
                      onChange={(e) => {
                        const f = formatContact(e.target.value);
                        setFormData({ ...formData, contact: f });
                        validateContact(f);
                      }}
                    />
                    {contactError && (
                      <p className={styles.errorMsg}>{contactError}</p>
                    )}
                  </div>

                  <div className={styles.formSelectWrap}>
                    <select
                      className={styles.formSelect}
                      value={formData.education}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                    >
                      <option value="">최종학력을 선택해주세요.</option>
                      <option value="고졸">고졸</option>
                      <option value="전문대졸">전문대졸</option>
                      <option value="대졸">대졸</option>
                      <option value="대학원 이상">대학원 이상</option>
                    </select>
                    <span className={styles.formHelp}>
                      최종학력마다 과정이 달라져요!
                    </span>
                  </div>

                  <div className={styles.formSelectWrap}>
                    <select
                      className={styles.formSelect}
                      value={formData.hope_course}
                      onChange={(e) =>
                        setFormData({ ...formData, hope_course: e.target.value })
                      }
                    >
                      <option value="">희망과정을 선택해주세요.</option>
                      <option value="사회복지사">사회복지사</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 취득사유 */}
              <div className={styles.reasonSection}>
                <p className={styles.reasonLabel}>취득사유</p>
                <div className={styles.reasonGroup}>
                  {["즉시취업", "이직", "미래준비", "취미"].map((opt) => {
                    const sel = formData.reason
                      ? formData.reason.split(", ").includes(opt)
                      : false;
                    return (
                      <label
                        key={opt}
                        className={`${styles.reasonItem} ${sel ? styles.reasonItemSel : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={sel}
                          style={{ display: "none" }}
                          onChange={() => {
                            const cur = formData.reason
                              ? formData.reason.split(", ").filter(Boolean)
                              : [];
                            const upd = sel
                              ? cur.filter((r) => r !== opt)
                              : [...cur, opt];
                            setFormData({
                              ...formData,
                              reason: upd.join(", "),
                            });
                          }}
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 선택 사항 */}
              <div className={styles.optionalSection}>
                <p className={styles.optionalTitle}>선택 사항</p>

                {/* 빠른 상담 토글 */}
                <div className={styles.fastConsultBlock}>
                  <div
                    className={styles.fastConsultRow}
                    onClick={() => setFastConsult((v) => !v)}
                  >
                    <p className={styles.fastConsultLabel}>
                      빠른 상담을 원합니다.
                    </p>
                    <span
                      className={`${styles.formToggle} ${fastConsult ? styles.formToggleOn : ""}`}
                    >
                      {fastConsult && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.3643 3.40738C14.5518 3.59491 14.6571 3.84921 14.6571 4.11438C14.6571 4.37954 14.5518 4.63385 14.3643 4.82138L6.86901 12.3167C6.76996 12.4158 6.65236 12.4944 6.52293 12.548C6.3935 12.6016 6.25477 12.6292 6.11468 12.6292C5.97458 12.6292 5.83586 12.6016 5.70643 12.548C5.577 12.4944 5.4594 12.4158 5.36034 12.3167L1.63634 8.59338C1.54083 8.50113 1.46465 8.39079 1.41224 8.26878C1.35983 8.14678 1.33225 8.01556 1.33109 7.88278C1.32994 7.75 1.35524 7.61832 1.40552 7.49542C1.4558 7.37253 1.53006 7.26088 1.62395 7.16698C1.71784 7.07309 1.82949 6.99884 1.95239 6.94856C2.07529 6.89828 2.20697 6.87297 2.33974 6.87413C2.47252 6.87528 2.60374 6.90287 2.72575 6.95528C2.84775 7.00769 2.9581 7.08387 3.05034 7.17938L6.11434 10.2434L12.9497 3.40738C13.0425 3.31445 13.1528 3.24073 13.2742 3.19044C13.3955 3.14014 13.5256 3.11426 13.657 3.11426C13.7884 3.11426 13.9185 3.14014 14.0398 3.19044C14.1612 3.24073 14.2715 3.31445 14.3643 3.40738Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  <p className={styles.fastConsultDesc}>
                    빠른 상담 체크 시{" "}
                    <span className={styles.fastConsultStrong}>
                      오후 7시 이전 신청건
                    </span>
                    까지 당일 상담,
                    <br />
                    이후 건은 익일 오전 10시~ 오후 7시 사이에 연락드립니다.
                  </p>
                </div>

                {/* 선호 시간 + 메모 */}
                <div className={styles.optionalFields}>
                  <div className={styles.optionalField}>
                    <div className={styles.optionalFieldHead}>
                      <p className={styles.optionalFieldLabel}>상담 선호 시간</p>
                      <p className={styles.optionalFieldHelp}>복수선택 가능</p>
                    </div>
                    <div className={styles.timeGrid}>
                      {["10:00~13:00", "14:00~17:00", "17:00~19:00"].map((t) => {
                        const sel = preferredTimes.includes(t);
                        return (
                          <button
                            type="button"
                            key={t}
                            className={`${styles.timeChip} ${sel ? styles.timeChipSel : ""}`}
                            onClick={() =>
                              setPreferredTimes((prev) =>
                                sel
                                  ? prev.filter((x) => x !== t)
                                  : [...prev, t],
                              )
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.optionalField}>
                    <div className={styles.optionalFieldHead}>
                      <p className={styles.optionalFieldLabel}>
                        상담 시간 관련 메모(25자 이내)
                      </p>
                      <p
                        className={`${styles.optionalFieldHelp} ${styles.optionalFieldHelpLoose}`}
                      >
                        편하신 요일, 시간 관련 메모를 남겨주세요.
                      </p>
                    </div>
                    <input
                      type="text"
                      className={styles.memoInput}
                      maxLength={25}
                      placeholder="월/수/금 오전, 화/목 오후 선호"
                      value={formData.memo}
                      onChange={(e) =>
                        setFormData({ ...formData, memo: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formAgreeWrap}>
            <div
              className={styles.formAgreeRow}
              onClick={() => setPrivacyAgreed((v) => !v)}
            >
              <p className={styles.formAgreeLabel}>
                <button
                  type="button"
                  className={styles.formAgreeLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPrivacyModal(true);
                  }}
                >
                  개인정보처리방침
                </button>
                <span className={styles.formAgreeWord}>동의</span>
                <span className={styles.formAgreeRequired}>(필수)</span>
              </p>
              <span
                className={`${styles.formToggle} ${privacyAgreed ? styles.formToggleOn : ""}`}
              >
                {privacyAgreed && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.3643 3.40738C14.5518 3.59491 14.6571 3.84921 14.6571 4.11438C14.6571 4.37954 14.5518 4.63385 14.3643 4.82138L6.86901 12.3167C6.76996 12.4158 6.65236 12.4944 6.52293 12.548C6.3935 12.6016 6.25477 12.6292 6.11468 12.6292C5.97458 12.6292 5.83586 12.6016 5.70643 12.548C5.577 12.4944 5.4594 12.4158 5.36034 12.3167L1.63634 8.59338C1.54083 8.50113 1.46465 8.39079 1.41224 8.26878C1.35983 8.14678 1.33225 8.01556 1.33109 7.88278C1.32994 7.75 1.35524 7.61832 1.40552 7.49542C1.4558 7.37253 1.53006 7.26088 1.62395 7.16698C1.71784 7.07309 1.82949 6.99884 1.95239 6.94856C2.07529 6.89828 2.20697 6.87297 2.33974 6.87413C2.47252 6.87528 2.60374 6.90287 2.72575 6.95528C2.84775 7.00769 2.9581 7.08387 3.05034 7.17938L6.11434 10.2434L12.9497 3.40738C13.0425 3.31445 13.1528 3.24073 13.2742 3.19044C13.3955 3.14014 13.5256 3.11426 13.657 3.11426C13.7884 3.11426 13.9185 3.14014 14.0398 3.19044C14.1612 3.24073 14.2715 3.31445 14.3643 3.40738Z"
                      fill="white"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <button
            className={styles.formSubmit}
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
          >
            {loading ? "처리 중..." : "무료상담 신청하기"}
          </button>

          <div className={styles.formPhoneWrap}>
            <p className={styles.formPhoneNote}>
              전화 상담도 가능합니다. (상담시간: 평일 09:00 ~ 18:00)
            </p>
            <a href="tel:070-8652-2574" className={styles.formPhoneBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={styles.formPhoneIcon}
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.035 14.755C10.075 14.7197 7.35433 14.3437 4.50499 11.495C1.65633 8.64566 1.28099 5.92566 1.24499 4.96499C1.19166 3.50099 2.31299 2.07899 3.60833 1.52366C3.76431 1.4563 3.93513 1.43066 4.10401 1.44924C4.2729 1.46782 4.43405 1.52999 4.57166 1.62966C5.63833 2.40699 6.37433 3.58299 7.00633 4.50766C7.14538 4.71081 7.20484 4.95802 7.17336 5.20219C7.14189 5.44635 7.02169 5.67041 6.83566 5.83166L5.53499 6.79766C5.47215 6.84303 5.42792 6.90968 5.41051 6.9852C5.3931 7.06073 5.40369 7.14002 5.44033 7.20832C5.73499 7.74366 6.25899 8.54099 6.85899 9.14099C7.45899 9.74099 8.29433 10.2997 8.86699 10.6277C8.93879 10.668 9.02331 10.6792 9.10316 10.6591C9.18302 10.6391 9.25214 10.5891 9.29633 10.5197L10.143 9.23099C10.2987 9.02422 10.5283 8.8857 10.7838 8.84444C11.0393 8.80319 11.3008 8.86239 11.5137 9.00966C12.4517 9.65899 13.5463 10.3823 14.3477 11.4083C14.4554 11.5469 14.524 11.7119 14.5461 11.8861C14.5683 12.0602 14.5433 12.2371 14.4737 12.3983C13.9157 13.7003 12.5037 14.809 11.035 14.755Z"
                  fill="white"
                />
              </svg>
              <span>전화 상담하기</span>
              <span>070-8652-2574</span>
            </a>
          </div>
        </div>
      </div>

      {/* 제출 완료 팝업 */}
      {done && (
        <div className={styles.modalOverlay} onClick={() => setDone(false)}>
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 360 }}
          >
            <div className={styles.doneWrap}>
              <button
                className={styles.closeBtn}
                onClick={() => setDone(false)}
                aria-label="닫기"
                style={{ position: "absolute", top: 16, right: 16 }}
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
              <Image
                src="/complete-check.png"
                alt="완료"
                width={160}
                height={160}
                priority
                style={{ margin: "0 auto 16px" }}
              />
              <p className={styles.doneTitle}>
                신청이 완료되었습니다.{"\n"}곧 연락드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 개인정보처리방침 모달 */}
      {showPrivacyModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <p className={styles.modalTitle}>개인정보처리방침</p>
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
                필수 - 이름, 연락처(휴대전화번호), 최종학력, 희망과정, 취득사유
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
        className={`${styles.floatingBtn} ${!showFloating ? styles.floatingBtnHidden : ""}`}
        onClick={scrollToForm}
      >
        무료상담 신청하기
      </button>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingContent />
    </Suspense>
  );
}
