"use client";

import Image from "next/image";
import { useState, useEffect, Suspense, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./landing.module.css";
import Footer from "./components/Footer";

const REAL_IMAGES = ["/main_01.png", "/main_02.png", "/main_03.png", "/main_04.png"];
const CONFIRM_IMAGES = ["/confirm_01.png", "/confirm_02.png", "/confirm_03.png", "/confirm_04.png", "/confirm_05.png"];

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
            <img src={src} alt={`후기 ${i + 1}`} className={styles.confirmImg} loading="eager" />
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

const COURSE_OPTIONS = [
  "사회복지사", "아동학사", "평생교육사", "편입/대학원",
  "건강가정사", "청소년지도사", "보육교사", "심리상담사",
];

function LandingContent() {
  const searchParams = useSearchParams();
  const [clickSource, setClickSource] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [showFloating, setShowFloating] = useState(false);

  // 폼 상태
  const [formData, setFormData] = useState({ name: "", contact: "", residence: "", education: "", hope_course: "", reason: "" });
  const [loading, setLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [customCourse, setCustomCourse] = useState("");

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
      ["redog2oi", "맘카페_부천소사구"], ["babylovecafe", "맘카페_베이비러브"],
      ["magic26", "맘카페_안평맘스비"], ["chobomamy", "맘카페_러브양산맘"],
      ["jinhaemam", "맘카페_창원진해댁"], ["momspanggju", "맘카페_광주맘스팡"],
      ["cjasm", "맘카페_충주아사모"], ["yul2moms", "맘카페_율하맘"],
      ["chbabymom", "맘카페_춘천맘"], ["ksn82599", "맘카페_둔산맘"],
      ["anjungmom", "맘카페_평택안포맘"], ["tlgmdaka0", "맘카페_시맘수"],
      ["naese", "맘카페_중리사랑방"], ["mygodsend", "맘카페_화성남양애"],
      ["cjsam", "맘카페_순광맘"], ["seosanmom", "맘카페_서산맘"],
    ];
    for (const [id, name] of cafeMap) {
      if (referrer.includes(`cafe.naver.com/${id}`) || referrer.includes(`/cafes/${id}`)) {
        setClickSource(name);
        return;
      }
    }
    if (referrer.includes("cafe.naver.com")) setClickSource("네이버카페_referrer");
  }, [searchParams]);

  useEffect(() => {
    const heroBtn = document.getElementById("hero-cta-btn");
    const footerBtn = document.getElementById("consult-btn");
    if (!heroBtn || !footerBtn) return;

    let heroVisible = true;
    let footerVisible = false;

    const update = () => setShowFloating(!heroVisible && !footerVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => { heroVisible = entry.isIntersecting; update(); },
      { threshold: 0 }
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => { footerVisible = entry.isIntersecting; update(); },
      { threshold: 0 }
    );

    heroObserver.observe(heroBtn);
    footerObserver.observe(footerBtn);
    return () => { heroObserver.disconnect(); footerObserver.disconnect(); };
  }, []);

  const formatContact = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };

  const validateContact = (contact: string) => {
    const cleaned = contact.replace(/[-\s]/g, "");
    if (!cleaned.length) { setContactError(""); return true; }
    if (!cleaned.startsWith("010") && !cleaned.startsWith("011")) {
      setContactError("010 또는 011로 시작하는 번호를 입력해주세요");
      return false;
    }
    setContactError("");
    return true;
  };

  const confirmCourseSelection = () => {
    const all = [...selectedCourses];
    if (customCourse.trim()) all.push(customCourse.trim());
    setFormData({ ...formData, hope_course: all.join(", ") });
    setShowCourseModal(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
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
          click_source: clickSource ? `${clickSource}_랜딩페이지` : "랜딩페이지",
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "저장에 실패했습니다.");
      }
      setDone(true);
      setTimeout(() => setModalOpen(false), 5000);
    } catch (e) {
      alert(e instanceof Error ? e.message : "저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.name.length > 0 &&
    formData.contact.replace(/[-\s]/g, "").length >= 10 &&
    !contactError &&
    formData.residence.length > 0 &&
    formData.education.length > 0 &&
    formData.hope_course.length > 0 &&
    privacyAgreed;

  return (
    <div className={styles.container}>
      {/* 첫번째 영역 */}
      <div className={styles.heroSection}>
        <p className={styles.heroTitle}>혼자 준비하지마세요</p>
        <div className={styles.heroTextWrap}>
          <div className={styles.jubumentsBox}>
            <span className={styles.jubumentsText}>주부님들 재취업 1위</span>
          </div>
          <p className={styles.heroTextWhite}>사회복지사 자격증</p>
        </div>
        <p className={styles.heroDesc}>지금 상황에 맞는{"\n"}재취업 방향을 안내해드려요</p>
        <ImageCarousel />
        <div className={styles.herosvg}>        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
  <path d="M1.77075 3.50555C1.77075 3.85351 1.90931 4.18742 2.15527 4.43353L9.58038 11.8586C9.8265 12.1046 10.1604 12.2432 10.5084 12.2432C10.8562 12.243 11.1903 12.1046 11.4363 11.8586L18.8602 4.43353C19.0992 4.186 19.2323 3.85477 19.2293 3.51068C19.2263 3.16668 19.088 2.83753 18.8448 2.59424C18.6016 2.351 18.2723 2.21283 17.9283 2.20972C17.5842 2.20673 17.2517 2.33854 17.0042 2.57758L10.5084 9.07471L4.01123 2.57758C3.76518 2.33168 3.43111 2.19441 3.08325 2.19434C2.73543 2.19434 2.40136 2.33179 2.15527 2.57758C1.90935 2.82357 1.7709 3.15773 1.77075 3.50555Z" fill="#FF751F"/>
  <path d="M1.77075 10.0681C1.77075 10.416 1.90931 10.7499 2.15527 10.996L9.58038 18.4211C9.8265 18.6671 10.1604 18.8057 10.5084 18.8057C10.8562 18.8055 11.1903 18.6671 11.4363 18.4211L18.8602 10.996C19.0992 10.7485 19.2323 10.4173 19.2293 10.0732C19.2263 9.72918 19.088 9.40003 18.8448 9.15674C18.6016 8.9135 18.2723 8.77533 17.9283 8.77222C17.5842 8.76923 17.2517 8.90104 17.0042 9.14008L10.5084 15.6372L4.01123 9.14008C3.76518 8.89418 3.43111 8.75691 3.08325 8.75684C2.73543 8.75684 2.40136 8.89429 2.15527 9.14008C1.90935 9.38607 1.7709 9.72023 1.77075 10.0681Z" fill="#FF751F"/>
</svg>
        </div>
        <button id="hero-cta-btn" className={`${styles.sectionFinalBtn} ${styles.heroCta}`} onClick={() => {
          document.getElementById("consult-btn")?.scrollIntoView({ behavior: "smooth" });
        }}>
          무료상담 신청하기 
        </button>
      </div>

      {/* 두번째 섹션 - 사회복지사란? */}
      <div className={styles.section2}>
        <p className={styles.section2Title}>사회복지사란?</p>
        
        <p className={styles.section2Desc}>
          사회복지에 관한 전문지식과 기술을 가진 사람으로서,<br/> 보건복지부 장관이 발급하는 사회복지사 자격증을 받은 사람을 말한다.
         <br/> (출처: 네이버지식백과, 사회복지사)
        </p>
      </div>

      {/* 세번째 섹션 - 선택 이유 */}
      <div className={styles.section3}>
        <div className={styles.section3Title}>
          <p className={styles.section3TitleNormal}>똑똑한 주부님들이<br/>
     <span className={styles.section3TitleUnderline}>사회복지사 2급을 선택</span>하는 이유</p>
        </div>
        <div className={styles.section3Grid}>
          <div className={styles.section3Card}>
            <span className={styles.section3Point}>POINT 1</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/point_01.png" alt="100% 온라인 수업" className={styles.section3Img} loading="eager" />
            <p className={styles.section3CardText}>100%{"\n"}온라인 수업</p>
          </div>
          <div className={styles.section3Card}>
            <span className={styles.section3Point}>POINT 2</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/point_02.png" alt="나이 제한 없음" className={styles.section3Img} loading="eager" />
            <p className={styles.section3CardText}>나이{"\n"}제한 없음</p>
          </div>
          <div className={styles.section3Card}>
            <span className={styles.section3Point}>POINT 3</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/point_03.png" alt="경력 없어도 취업 가능" className={styles.section3Img} loading="eager" />
            <p className={styles.section3CardText}>경력 없어도{"\n"}취업 가능</p>
          </div>
          <div className={styles.section3Card}>
            <span className={styles.section3Point}>POINT 4</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/point_04.jpg" alt="보건복지부 발급 국가자격증" className={styles.section3Img} loading="eager" />
            <p className={styles.section3CardText}>보건복지부 발급{"\n"}국가자격증</p>
          </div>
        </div>
      </div>

      {/* 네번째 섹션 */}
      <div className={styles.section4}>
        <div className={styles.section4TitleWrap}>
          <span className={styles.section4Badge}>1</span>
          <div className={styles.section_contentwrap}>          
          <p className={styles.section4TitleLight}>사회복지사</p>
          <p className={styles.section4TitleBold}>일자리 확대 <span className={styles.section4TitleLightInline}>및</span> 고용인원 증가</p>
          </div>
          <div className={styles.section4GraphWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/graph_01.png" alt="그래프 1" className={styles.section4Graph} loading="eager" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/graph_02.png" alt="그래프 2" className={styles.section4Graph2} loading="eager" />
          </div>

        </div>
      </div>

      {/* 다섯번째 섹션 */}
      <div className={styles.section5}>
        <div className={styles.section4TitleWrap}>
          <span className={styles.section4Badge}>2</span>
          <div className={styles.section_contentwrap}>
            <p className={styles.section4TitleLight}>성별/연령 제한 없는</p>
            <p className={styles.section4TitleBold}>다양한 기관으로 취업 <span className={styles.section4TitleLightInline}>가능</span></p>
          </div>
        </div>
        <div className={styles.placeGrid}>
          {[
            { src: "/place_01.png", label: "노인복지시설" },
            { src: "/place_02.png", label: "아동복지시설" },
            { src: "/place_03.png", label: "청소년복지시설" },
            { src: "/place_04.png", label: "여성복지시설" },
            { src: "/place_05.png", label: "장애인복지시설" },
            { src: "/place_06.png", label: "다문화가족지원센터" },
          ].map(({ src, label }) => (
            <div key={label} className={styles.placeCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={label} className={styles.placeImg} loading="eager" />
              <div className={styles.placeLabel}>{label}</div>
            </div>
          ))}
        </div>
        <div className={styles.placeExtra}>
          <p className={styles.placeExtraText}>그 외에도 가정폭력보호시설, 정신건강 증진시설, 성폭력피해보호시설,{"\n"}사회복지관, 한부모가족복지시설, 노숙인시설, 결핵 · 한센시설, 건강가정지원센터,<br/>다함께돌봄센터, 지역자활센터 등 다양한 기관이 있습니다.</p>
          <p className={styles.placeExtraSource}>출처: 2024년 사회복지시설 종사자 인건비 가이드라인 (보건복지부, 2024)</p>
        </div>
      </div>

      {/* 메인 3섹션 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/main_3seciotn.png" alt="메인 섹션" style={{ width: "100%", height:"auto", display: "block" }} loading="eager" />

      {/* 여섯번째 섹션 */}
      <div className={styles.section6}>
        <div className={styles.section4TitleWrap}>
          <span className={styles.section4Badge_white}>4</span>
          <div className={styles.section_contentwrap}>
            <p className={styles.section6TitleLine}>
              <span className={styles.section6TitleBold}>한평생 올케어</span>
              <span className={styles.section6TitleLight}>반이면</span>
            </p>
            <p className={styles.section6TitleLine}>
              <span className={styles.section6TitleBold}>주부님들도 가능</span>
              <span className={styles.section6TitleLight}>한 이유!</span>
            </p>
          </div>
        </div>
        <div className={styles.allcareList}>
          {([
            { point: "POINT 1", text: <>수강료 <span style={{ color: "#ff4000" }}>70%</span> 지원</> as ReactNode, alt: "수강료 70% 지원", img: "/allcare_01.png" },
            { point: "POINT 2", text: <>실습 매칭<br/>시스템 열람권</> as ReactNode, alt: "실습 매칭 시스템 열람권", img: "/allcare_02.png" },
            { point: "POINT 3", text: <>취업 컨설팅</> as ReactNode, alt: "취업 컨설팅", img: "/allcare_03.png" },
            { point: "POINT 4", text: <>미이수시 환급제도</> as ReactNode, alt: "미이수시 환급제도", img: "/allcare_04.png" },
          ] as { point: string; text: ReactNode; alt: string; img: string }[]).map(({ point, text, alt, img }, i, arr) => (
            <div key={point} style={{ width: "100%" }}>
              <div className={styles.allcareItem}>
                <div className={styles.allcareLeft}>
                  <span className={styles.allcarePoint}>{point}</span>
                  <p className={styles.allcareText}>{text}</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={alt} className={styles.allcareImg} loading="eager" />
              </div>
              {i < arr.length - 1 && (
                <div className={styles.allcareDivider}>
                  <button className={styles.allcarePlusBtn} aria-label="더보기">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8.03112 1.0166C8.50786 1.01796 8.89366 1.40595 8.89254 1.88259L8.87993 7.11997L14.1179 7.10826C14.594 7.10754 14.9813 7.49157 14.9829 7.96794C14.984 8.44448 14.5989 8.83234 14.1224 8.83393L8.87542 8.84654L8.86191 14.156C8.86038 14.6325 8.47251 15.0177 7.99598 15.0166C7.51968 15.0148 7.13341 14.6271 7.13455 14.1506L7.14897 8.85105L1.84885 8.86457C1.37264 8.86532 0.984507 8.48028 0.982913 8.00398C0.98181 7.52753 1.36793 7.13967 1.84434 7.138L7.15257 7.12358L7.16609 1.87809C7.16743 1.40187 7.55453 1.01588 8.03112 1.0166Z" fill="#FF751F"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 마지막 섹션 */}
      <div className={styles.sectionFinal}>
        <div className={styles.sectionFinalBg} aria-hidden="true" />
        <div className={styles.sectionFinalTextWrap}>
          <p className={styles.sectionFinalYes}>YES!</p>
          <p className={styles.sectionFinalTitle}>함께라면 가능합니다</p>
        </div>
        <p className={styles.sectionFinalSub}>한평생에서 지금 시작하세요!</p>
        <ConfirmCarousel />
        <button id="consult-btn" className={styles.sectionFinalBtn} onClick={() => setModalOpen(true)}>
          무료상담 신청하기 
        </button>
        <p className={styles.sectionFinalNote}>* 수강신청은 개강반 정원에 따라 조기마감 될 수 있습니다.</p>
      </div>

      <Footer />

      {/* 플로팅 CTA 버튼 */}
      <button
        className={`${styles.floatingBtn} ${!showFloating ? styles.floatingBtnHidden : ""}`}
        onClick={() => document.getElementById("consult-btn")?.scrollIntoView({ behavior: "smooth" })}
      >
        무료상담 신청하기 
      </button>

      {/* 폼 팝업 */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              key="overlay"
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
            >
            <motion.div
              key="sheet"
              className={styles.sheet}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 완료 화면 */}
              {done ? (
                <div className={styles.doneWrap}>
                  <button className={styles.closeBtn} onClick={() => setModalOpen(false)} aria-label="닫기" style={{ position: "absolute", top: 16, right: 16 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <Image src="/complete-check.png" alt="완료" width={200} height={200} priority style={{ margin: "0 auto 16px" }} />
                  <p className={styles.doneTitle}>신청이 완료되었습니다.{"\n"}곧 연락드리겠습니다.</p>
                </div>
              ) : (
                <>
                  <div className={styles.sheetHeader}>
                    <p className={styles.sheetTitle}>무료 학습 상담 신청</p>
                    <button className={styles.closeBtn} onClick={() => setModalOpen(false)} aria-label="닫기">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <div className={styles.sheetBody}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>이름 <span style={{ color: "#EF4444" }}>*</span></label>
                      <input type="text" placeholder="이름을 입력해주세요" className={styles.inputField}
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} autoFocus />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>연락처 <span style={{ color: "#EF4444" }}>*</span></label>
                      <input type="tel" placeholder="010-0000-0000" className={styles.inputField}
                        value={formData.contact}
                        onChange={(e) => {
                          const f = formatContact(e.target.value);
                          setFormData({ ...formData, contact: f });
                          validateContact(f);
                        }} />
                      {contactError && <p className={styles.errorMsg}>{contactError}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        거주지 <span style={{ color: "#EF4444" }}>*</span>{" "}
                        <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 400 }}>미기재 시 실습처 배정에 불이익이 발생</span>
                      </label>
                      <input type="text" placeholder="예) 대전 유성구, 경남 창원시" className={styles.inputField}
                        value={formData.residence} onChange={(e) => setFormData({ ...formData, residence: e.target.value })} />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        최종학력 <span style={{ color: "#EF4444" }}>*</span>{" "}
                        <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 400 }}>최종학력마다 과정이 달라져요!</span>
                      </label>
                      <select className={styles.inputField} value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })} style={{ cursor: "pointer" }}>
                        <option value="">선택해주세요</option>
                        <option value="고졸">고졸</option>
                        <option value="전문대졸">전문대졸</option>
                        <option value="대졸">대졸</option>
                        <option value="대학원 이상">대학원 이상</option>
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>희망과정 <span style={{ color: "#EF4444" }}>*</span></label>
                      <div className={`${styles.inputField} ${styles.courseSelectField}`}
                        onClick={() => {
                          const existing = formData.hope_course ? formData.hope_course.split(", ").filter(Boolean) : [];
                          setSelectedCourses(existing.filter((c) => COURSE_OPTIONS.includes(c)));
                          setCustomCourse(existing.filter((c) => !COURSE_OPTIONS.includes(c)).join(", "));
                          setShowCourseModal(true);
                        }}>
                        {formData.hope_course
                          ? <span style={{ color: "#191f28", fontSize: "16px" }}>{formData.hope_course}</span>
                          : <span style={{ color: "#9ca3af", fontSize: "16px" }}>과정을 선택해주세요</span>}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        취득사유 <span style={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}>(복수선택 가능)</span>
                      </label>
                      <div className={styles.reasonGroup}>
                        {["즉시취업", "이직", "미래준비", "취미"].map((opt) => {
                          const sel = formData.reason ? formData.reason.split(", ").includes(opt) : false;
                          return (
                            <label key={opt} className={`${styles.reasonItem} ${sel ? styles.reasonItemSel : ""}`}>
                              <input type="checkbox" checked={sel} style={{ display: "none" }}
                                onChange={() => {
                                  const cur = formData.reason ? formData.reason.split(", ").filter(Boolean) : [];
                                  const upd = sel ? cur.filter((r) => r !== opt) : [...cur, opt];
                                  setFormData({ ...formData, reason: upd.join(", ") });
                                }} />
                              {opt}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.checkboxLabel}>
                        <input type="checkbox" checked={privacyAgreed}
                          onChange={(e) => setPrivacyAgreed(e.target.checked)} className={styles.checkbox} />
                        <span>
                          <button type="button" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }} className={styles.privacyLink}>
                            개인정보처리방침
                          </button>{" "}동의 <span style={{ color: "#EF4444" }}>*</span>
                        </span>
                      </label>
                    </div>

                    <button className={styles.submitBtn} disabled={!isFormValid || loading} onClick={handleSubmit}>
                      {loading ? "처리 중..." : "제출하기"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 개인정보처리방침 모달 */}
      {showPrivacyModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPrivacyModal(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>개인정보처리방침</h3>
              <button className={styles.closeBtn} onClick={() => setShowPrivacyModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={styles.modalScroll}>
              <p className={styles.modalItem}><strong>1. 개인정보 수집 및 이용 목적</strong><br />사회복지사 자격 취득 상담 진행, 문의사항 응대<br />개인정보는 상담 서비스 제공을 위한 목적으로만 수집 및 이용되며, 동의 없이 제3자에게 제공되지 않습니다</p>
              <p className={styles.modalItem}><strong>2. 수집 및 이용하는 개인정보 항목</strong><br />필수 - 이름, 연락처(휴대전화번호), 거주지, 최종학력, 희망과정, 취득사유</p>
              <p className={styles.modalItem}><strong>3. 보유 및 이용 기간</strong><br />법령이 정하는 경우를 제외하고는 수집일로부터 1년 또는 동의 철회 시까지 보유 및 이용합니다.</p>
              <p className={styles.modalItem}><strong>4. 동의 거부 권리</strong><br />신청자는 동의를 거부할 권리가 있습니다. 단, 동의를 거부하는 경우 상담 서비스 이용이 제한됩니다.</p>
            </div>
          </div>
        </div>
      )}

      {/* 희망과정 모달 */}
      {showCourseModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCourseModal(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>희망과정 선택</h3>
              <button className={styles.closeBtn} onClick={() => setShowCourseModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={styles.courseModalContent}>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 12px" }}>복수 선택이 가능합니다</p>
              <div className={styles.courseList}>
                {COURSE_OPTIONS.map((course) => (
                  <button key={course}
                    className={`${styles.courseItem} ${selectedCourses.includes(course) ? styles.courseItemSel : ""}`}
                    onClick={() => setSelectedCourses((p) => p.includes(course) ? p.filter((c) => c !== course) : [...p, course])}>
                    <span>{course}</span>
                    {selectedCourses.includes(course) && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10L8 14L16 6" stroke="#4C85FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f2f4f6" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#4e5968", marginBottom: "8px" }}>직접 입력</label>
                <input type="text" className={styles.customInput} placeholder="원하는 과정을 직접 입력해주세요"
                  value={customCourse} onChange={(e) => setCustomCourse(e.target.value)} />
              </div>
            </div>
            <div style={{ padding: "12px 20px 20px" }}>
              <button className={styles.courseConfirmBtn}
                disabled={selectedCourses.length === 0 && !customCourse.trim()}
                onClick={confirmCourseSelection}>
                {selectedCourses.length > 0 || customCourse.trim() ? "선택 완료" : "과정을 선택해주세요"}
              </button>
            </div>
          </div>
        </div>
      )}
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
