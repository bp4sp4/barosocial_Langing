"use client";

import styles from "../landing.module.css";

const REVIEWS = [
  {
    label: "47세 경력단절 주부, 재취업 성공",
    title: "막막했던 재취업에\n자신감이 생겼어요.",
    name: "김*선 님",
    body: "아이들을 키우느라 오랫동안 일을 쉬어 재취업이 가능할지 걱정이 많았습니다. 나이도 있고 경력 공백도 길어서 자신감이 많이 떨어진 상태였는데, 사회복지사 자격증을 취득한 후 관련 분야로 취업까지 하게 되었어요. 그동안의 고민이 무색할 만큼 새로운 시작을 할 수 있었습니다.",
    img: "/optimized/profile2.webp",
  },
  {
    label: "65세 정년퇴직 후 취업 성공",
    title: "나이가 걸림돌이\n되지 않았어요.",
    name: "김*숙 님",
    body: "요즘은 다들 너무 건강해요~ 정년퇴직 후 앞으로 어떻게 시간을 보내야 할지 고민이 많았습니다. 단순히 쉬기보다는 보람 있는 일을 하고 싶어 사회복지사 자격증에 도전했어요. 나이 때문에 걱정도 했지만 취득 후 관련 시설에 취업까지 하게 되면서 제2의 인생을 시작한 기분입니다.",
    img: "/optimized/profile3.webp",
  },
  {
    label: "52세 퇴직 준비자도 취득 성공",
    title: "노후 대비가 한결 든든\n해졌습니다.",
    name: "최*수 님",
    body: "퇴직이 가까워지면서 앞으로 무엇을 해야 할지 고민이 많았습니다. 사회복지 분야에 관심은 있었지만 나이가 많아 시작하기 망설여졌는데, 생각보다 많은 분들이 비슷한 상황에서 준비하고 계시더라고요. 덕분에 용기를 내어 시작했고 만족스러운 결과를 얻었습니다.",
    img: "/optimized/profile4.webp",
  },
  {
    label: "37세 워킹맘도 취득 성공",
    title: "육아와 병행할 수\n있었어요.",
    name: "정*미 님",
    body: "아이를 키우면서 일을 하고 있어 시간을 내기가 쉽지 않았습니다. 그래서 계속 미루고 있었는데, 온라인으로 진행할 수 있어 부담이 적었고 일정 관리도 도움을 받아 끝까지 완주할 수 있었습니다. 저처럼 시간이 부족한 분들에게 큰 도움이 될 것 같아요.",
    img: "/optimized/profile05.webp",
  },
  {
    label: "58세, 친구와 함께 도전",
    title: "혼자가 아니라서\n끝까지 할 수 있었어요.",
    name: "신*자 님",
    body: "50대 후반이 되니 노후 준비에 대한 고민이 많아졌습니다. 혼자 시작하기엔 망설여졌는데 친구와 함께 도전하자는 이야기가 나와 용기를 냈어요. 서로 응원하며 공부하다 보니 어느새 둘 다 사회복지사 자격증을 취득하게 되었고, 지금은 관련 분야 취업도 준비하고 있습니다.",
    img: "/optimized/profile6.webp",
  },
  {
    label: "57세 제조업 종사자도 취득 성공",
    title: "퇴직 이후를 준비할 수\n있었습니다.",
    name: "김*성 님",
    body: "30년 넘게 제조업 현장에서 일하면서 정년 이후가 가장 큰 고민이었습니다. 몸을 쓰는 일은 점점 부담이 커지고 있었고, 앞으로 할 수 있는 일을 찾다가 사회복지사에 도전하게 되었어요. 처음에는 공부가 걱정됐지만 생각보다 잘 따라갈 수 있었고, 미래에 대한 불안도 많이 줄었습니다.",
    img: "/optimized/profile7.webp",
  },
];

// 후기 요약은 위 원문에서 확인되는 경험만 사용합니다. 나이·결과를 추가하지 않습니다.
const FEATURED_REVIEWS = [
  { review: REVIEWS[0], identity: "47세 · 경력단절 주부", type: "재취업 경험", before: "육아로 일을 쉬며 경력 공백과 재취업이 걱정됐어요.", preparation: "사회복지사 자격증을 취득했어요.", now: "취득 후 관련 분야에 취업했다고 전했어요." },
  { review: REVIEWS[4], identity: "58세 · 친구와 함께 도전", type: "취업 준비 중", before: "50대 후반, 노후 준비와 새로운 도전이 고민이었어요.", preparation: "친구와 서로 응원하며 자격증을 취득했어요.", now: "관련 분야 취업을 준비하고 있어요." },
];

const CAREER_FIELDS = [
  { icon: "heart", title: "노인 복지", workplace: "노인복지관·주야간보호센터·요양시설", work: "어르신의 생활 상담과 여가 활동을 도와요." },
  { icon: "child", title: "아동 복지", workplace: "지역아동센터·아동양육시설", work: "아이들의 방과 후 생활과 활동을 도와요." },
  { icon: "backpack", title: "청소년 복지", workplace: "청소년쉼터·청소년자립지원관", work: "청소년의 생활 적응과 자립 준비를 도와요." },
  { icon: "family", title: "여성·가족 복지", workplace: "한부모가족복지시설·여성 보호·지원시설", work: "생활의 어려움을 듣고 필요한 지원을 연결해요." },
  { icon: "accessibility", title: "장애인 복지", workplace: "장애인복지관·장애인 거주시설·직업재활시설", work: "일상생활과 사회 참여 프로그램을 도와요." },
  { icon: "home", title: "지역사회 복지", workplace: "종합사회복지관·지역자활센터", work: "이웃의 어려움을 듣고 복지 서비스를 연결해요." },
] as const;

const WORRIES = [
  { title: "공부를 쉰 지 오래돼서 걱정이에요.", body: "수업을 어떻게 듣는지부터 차근차근 알려드릴게요. 낯선 부분은 하나씩 알아가시면 돼요.", img: "/optimized/gift02.webp" },
  { title: "살림하면서 준비할 수 있을까요?", body: "지금 생활에서 공부할 시간을 얼마나 낼 수 있을지, 그 시간에 맞춰 어떤 준비가 가능할지 함께 살펴봐요.", img: "/optimized/process03.webp" },
  { title: "아직 시작할지 결정하지 못했어요.", body: "어떤 일을 할 수 있는지, 얼마나 준비해야 하는지 알아보신 뒤에 결정하셔도 괜찮아요.", img: "/optimized/process02.webp" },
];

const SUPPORT = [
  { title: "시작 전에는", body: "내 상황에 맞는 준비 방법을 알려드려요.", img: "/optimized/process02.webp" },
  { title: "수강 중에는", body: "1:1 담당자가 궁금한 점을 항상 답변해드려요.", img: "/optimized/allcare_03.webp" },
  { title: "실습을 준비할 때는", body: "거주지 근처로 직접 섭외해드려요.", img: "/optimized/process04.webp" },
];

const TRUST_BENEFITS = [
  {
    tag: <>교육비 <em>부담은 줄이고,</em> 기회는 <em>더 크게!</em></>,
    title: <>수강료 <em>최대 70%</em> 장학지원</>,
    body: "교육과정 수강료의 최대 70%까지 지원받아 부담없이 시작할 수 있습니다.",
    img: "/optimized/allcare_01.webp",
  },
  {
    tag: <>취업까지 한 번에, <em>전문가가 함께</em>해요!</>,
    title: <><em>1:1 실습처</em> 매칭보장</>,
    body: "이력서부터 면접까지 1:1 맞춤 취업 컨설팅으로 시작부터 끝까지 체계적으로 지원합니다.",
    img: "/optimized/allcare_03.webp",
  },
  {
    tag: <><em>끝까지 책임지는 교육,</em> 안심하고 시작하세요!</>,
    title: <>미이수 시 <em>환급제도</em></>,
    body: "교육 이수에 어려움이 있을 경우, 자체 환급제도를 통해 수강료를 일부 또는 전액 환급해드리는 제도를 운영하고 있습니다.",
    img: "/optimized/allcare_04.webp",
  },
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "고등학교만 나왔는데 가능할까요?",
    a: (
      <>
        네 가능합니다. 최종학력이 <strong>고등학교 졸업 이상</strong>이라면
        누구나 사회복지사 자격증을 준비할 수 있습니다. 자격증 취득 시 사회복지
        대학교 학위도 함께 받게 되십니다.
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
        분들도 집에서 간단히 준비할 수 있으며 실습도 무기한으로 미루거나,
        주말에도 가능하시도록 맞춰서 안내 도와드리고 있습니다.
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
        <strong>여성인력개발센터와 공식 협약</strong>으로 취업 연계 지원하고
        있으며, 자체적으로 취업 플랫폼도 운영중이기에 저희 학습자분들은
        자유롭게 활용 가능하십니다.
      </>
    ),
  },
  {
    q: "지금 시작해도 늦지 않았을까요?",
    a: (
      <>
        네, 실제로 <strong>40대~50대 주부님들이 가장 많이 준비</strong>하고
        계시며 <strong>노후대비와 실제 재취업</strong>을 위해 시작하시는 분들이
        더욱 늘어나고 있습니다. 걱정되시는 마음 저희도 누구보다 잘 알고
        있습니다. 허나 정말 잘 해내고 싶기 때문이시더라구요. 이 점 참고하여
        목표까지 이룰 수 있도록 함께 도와드리겠습니다. 😊
      </>
    ),
  },
];

function SectionHeading({ eyebrow, children, description }: { eyebrow: string; children: React.ReactNode; description?: React.ReactNode }) {
  return <div className={styles.sectionHeading} data-reveal="heading">
    <p className={styles.sectionEyebrow}>{eyebrow}</p>
    <h2 className={styles.trustSectionTitle}>{children}</h2>
    {description && <p className={styles.sectionDescription}>{description}</p>}
  </div>;
}

function ConsultButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button type="button" className={styles.sectionConsultBtn} data-reveal="action" onClick={onClick}>{children}<span aria-hidden="true">→</span></button>;
}

function ReviewPortrait({ review }: { review: typeof REVIEWS[number] }) {
  return <div className={styles.reviewImgBox}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={review.img} alt={`${review.name} 후기 사진`} className={styles.reviewImg} loading="lazy" decoding="async" /><div className={styles.reviewImgBlur} aria-hidden="true" />
  </div>;
}

function CareerIcon({ kind }: { kind: typeof CAREER_FIELDS[number]["icon"] }) {
  const artwork = {
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="m8 12 2.5 2.5L16 9" /></>,
    child: <><path d="M9 3.5a9 9 0 1 0 6 0M12 3c3 0 3 4 0 4" /><path d="M8 11h.01M16 11h.01M9 16c1.5 1.5 4.5 1.5 6 0" /></>,
    backpack: <><rect x="5" y="6" width="14" height="16" rx="3" /><path d="M9 6V4a3 3 0 0 1 6 0v2M8 11h8M8 22v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5M8 19h8" /></>,
    family: <><circle cx="9" cy="7" r="3" /><path d="M2 21v-3a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3M16 4a3 3 0 0 1 0 6M19 14a4 4 0 0 1 3 4v3" /></>,
    accessibility: <><circle cx="15" cy="3" r="1.5" /><path d="m9 9 2-3 4 3-2 5h6l-1 7M9 9l4 1M7 12a6 6 0 1 0 6 7" /></>,
    home: <><path d="m3 10 9-8 9 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 22V12h6v10" /></>,
  };
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{artwork[kind]}</svg>;
}

export default function LandingSections({ onConsult }: { onConsult: () => void }) {
  return <>
    <section className={`${styles.heroSection} ${styles.newStartHero}`} aria-labelledby="hero-title">
      <div className={styles.heroAccreditation}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/education-ministry-logo.png" alt="교육부" width={325} height={170} className={styles.heroAccreditationLogo} fetchPriority="high" />
        <p><span>정식 인가</span><strong>원격평생교육원</strong></p>
      </div>
      <div className={styles.heroTextWrap}>
        <p className={styles.heroTitle}>사회복지사 2급</p>
        <h1 id="hero-title" className={styles.heroCourse}><span>다시 일하고 싶은 나에게,</span><span className={styles.heroOpportunity}>사회복지사라는 새로운 기회.</span></h1>
      </div>
      <p className={styles.heroSupportCopy}>어떤 일을 할 수 있는지,<br />내 상황에서도 준비할 수 있을지 함께 알아보세요.</p>
      <div className={styles.heroCertificateScene}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/optimized/section3_03.webp" alt="개인정보가 가려진 사회복지사 자격증 예시" width={640} height={640} className={styles.heroCertificateImage} fetchPriority="high" />
      </div>
      <div className={styles.heroAction}>
        <button id="hero-cta-btn" type="button" className={`${styles.sectionFinalBtn} ${styles.heroCta}`} onClick={onConsult}>나에게 맞는 준비 방법 알아보기 <span aria-hidden="true">→</span></button>
        <p className={styles.ctaHelper}>상담 후, 시작 여부를 결정하셔도 괜찮아요.</p>
      </div>
    </section>

    <section className={styles.careerSection} aria-label="사회복지사 자격증 활용 분야">
      <SectionHeading eyebrow="내가 일하는 모습을 떠올려보세요" description={<>일할 수 있는 곳과 하는 일을 살펴보며,<br />내가 해보고 싶은 일을 찾아보세요.</>}>사회복지사 자격증 하나로,<br /><em>어디에서 일할 수 있을까요?</em></SectionHeading>
      <div className={styles.careerGrid}>{CAREER_FIELDS.map(item => <article key={item.title} className={styles.careerCard} data-field={item.icon} data-reveal="card">
        <div className={styles.careerCardHeader}><div className={styles.careerIcon}><CareerIcon kind={item.icon} /></div><h3>{item.title}</h3></div>
        <p className={styles.careerWorkplace}>{item.workplace.split("·").map((place, index) => <span key={`${place}-${index}`}>{index > 0 && <> ·<wbr /> </>}{place}</span>)}</p>
        <p className={styles.careerWork}>{item.work}</p>
      </article>)}</div>
      <div className={styles.careerOpportunityNote} data-reveal="soft">
        <span className={styles.opportunitySparkle} aria-hidden="true">✦</span>
        <p>사회복지사 자격증 1개로<br /><strong><span>모든 분야에</span>{" "}<span>취업이 가능합니다.</span></strong></p>
        <span className={styles.opportunityLine} aria-hidden="true" />
      </div>
    </section>

    <section className={`${styles.reviewSection} ${styles.storySection}`} aria-label="학습자 후기">
      <SectionHeading eyebrow="나와 닮은 시작">비슷한 고민으로<br /><span className={styles.storyHeadingLine}><em>시작한 분들의 이야기를 들어보세요.</em></span></SectionHeading>
      <div className={styles.featuredStories}>{FEATURED_REVIEWS.map(({ review, identity, type, before, preparation, now }) => <article key={review.name} className={styles.storyCard} data-reveal="card">
        <div className={styles.storyHeader}><div><span className={styles.storyType}>{type}</span><h3>{review.title}</h3><p>{review.name} · {identity}</p></div><ReviewPortrait review={review} /></div>
        <dl className={styles.storySummary}><div><dt>시작 전</dt><dd>{before}</dd></div><div><dt>준비</dt><dd>{preparation}</dd></div><div><dt>지금</dt><dd>{now}</dd></div></dl>
        <details className={styles.reviewOriginal}><summary>후기 원문 읽기</summary><p>{review.body}</p></details>
      </article>)}</div>
      <details className={styles.moreReviews}><summary>다른 학습자 이야기 더 보기 <span aria-hidden="true">＋</span></summary><div className={styles.moreReviewList}>{[REVIEWS[3], REVIEWS[1], REVIEWS[2], REVIEWS[5]].map(review => <article key={review.name} className={styles.storyCard}><div className={styles.storyHeader}><div><p className={styles.reviewLabel}>{review === REVIEWS[3] ? "37세 워킹맘 · 수강 경험" : review.label}</p><h3>{review.title}</h3><p>{review.name}</p></div><ReviewPortrait review={review} /></div><p className={styles.reviewBody}>{review.body}</p></article>)}</div></details>
      <div className={styles.credCaseWrap} data-reveal="image"><span className={styles.credPill}>수강생 사례 사진</span><div className={styles.confirmCarouselWrap}>
        <div className={styles.caseGallery} role="region" aria-label="수강생 사례 사진, 좌우로 넘겨보세요" tabIndex={0}>
          {["/optimized/confirm_01.webp", "/optimized/confirm_02.webp", "/optimized/confirm_03.webp", "/optimized/confirm_04.webp", "/optimized/confirm_05.webp"].map((src, index) => <div key={src} className={styles.confirmSlide}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`수강생 사례 사진 ${index + 1}`} className={styles.confirmImg} width={208} height={208} loading="lazy" decoding="async" />
          </div>)}
        </div>
      </div></div>
      <p className={styles.supportNote}>후기는 개인의 경험이며, 준비 과정과 결과는 각자의 상황에 따라 달라질 수 있어요.</p>
      <ConsultButton onClick={onConsult}>내 상황에서도 준비할 수 있을까요?</ConsultButton>
    </section>

    <section className={styles.worrySection} aria-label="시작 전 고민">
      <SectionHeading eyebrow="처음이라 망설여진다면">나도 할 수 있을까요?<br /><em className={styles.gentleHeading}>처음부터 다 알고 시작하실 필요는 없어요.</em></SectionHeading>
      <div className={styles.worryList}>{WORRIES.map(item => <article key={item.title} className={`${styles.worryCard} ${styles.reassuranceCard}`} data-reveal="card">
        <div><h3>“{item.title}”</h3><p>{item.body}</p></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt="" width={76} height={76} loading="lazy" decoding="async" />
      </article>)}</div>
    </section>

    <section className={`${styles.managementSection} ${styles.simpleSupport}`} aria-label="한평생 학습 지원">
      <SectionHeading eyebrow="필요한 순간에 함께">처음 알아보는 순간부터,<br /><em>막막한 부분은 함께 풀어갈게요.</em></SectionHeading>
      <div className={styles.supportCards}>{SUPPORT.map(item => <article key={item.title} data-reveal="card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt="" width={64} height={64} loading="lazy" decoding="async" /><div><h3>{item.title}</h3><p>{item.body}</p></div>
      </article>)}</div>
    </section>

    <section className={styles.trustSummarySection} aria-label="교육원 신뢰 근거">
      <SectionHeading eyebrow="한평생과 함께하는 이유" description="한평생의 교육 운영과 학습 지원을 확인해보세요.">어디서 시작할지도<br /><em>중요하니까요.</em></SectionHeading>
      <div className={styles.trustBenefitsFrame}>
        <div className={styles.trustBenefitsPanel}>
          {TRUST_BENEFITS.map(item => <article className={styles.trustBenefitRow} key={item.img} data-reveal="soft">
            <div className={styles.trustBenefitCopy}><span className={styles.trustBenefitTag}>{item.tag}</span><h3>{item.title}</h3><p>{item.body}</p></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt="" width={300} height={300} loading="lazy" decoding="async" />
          </article>)}
          <article className={styles.trustBenefitRow} data-reveal="soft">
            <div className={styles.trustBenefitCopy}><span className={styles.trustBenefitTag}>믿을 수 있는 배움, <em>시작부터 꼼꼼하게!</em></span><h3><em>교육부</em> 정식 인가 교육원</h3><p>필요한 과목을 이수하며 학위와 자격 취득을 준비해요.</p></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/education-ministry-logo.png" alt="교육부" width={325} height={170} loading="lazy" decoding="async" />
          </article>
          <article className={styles.trustBenefitRow} data-reveal="soft">
            <div className={styles.trustBenefitCopy}><span className={styles.trustBenefitTag}>자격 취득 그다음, <em>취업 준비도 함께!</em></span><h3><em>여성인력개발센터</em><br />공식 협약</h3><p>이력서·면접 등 취업 준비와 연결되는 지원을 안내해드려요.</p></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mainhero.png" alt="여성인력개발센터 공식 협약기관" width={106} height={106} loading="lazy" decoding="async" />
          </article>
          <article className={`${styles.trustBenefitRow} ${styles.employmentBenefitRow}`} data-reveal="soft">
            <div className={styles.trustBenefitCopy}><span className={styles.trustBenefitTag}>내 주변 채용 소식, <em>놓치지 않도록!</em></span><h3><em>내 근처 취업공고</em><br />알림톡</h3><p>자체 취업플랫폼을 통해 내가 있는 곳 근처의 취업공고를 알려드려요.</p></div>
            <div className={styles.employmentPhone}>
              <div className={styles.employmentPhoneScreen}>
                <span className={styles.employmentPhoneIsland} aria-hidden="true" />
                <div className={styles.employmentPhoneViewport}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/optimized/baro-employment-app.webp" alt="한평생 바로취업 플랫폼의 일자리 찾기, 이력서 작성, 정부 지원금 안내 화면" width={540} height={1170} className={styles.employmentAppScreen} loading="lazy" decoding="async" />
                </div>
                <span className={styles.employmentPhoneHome} aria-hidden="true" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className={styles.faqSection} id="support-faq" aria-label="자주 묻는 질문">
      <div className={styles.faqTitleWrap} data-reveal="heading"><p className={styles.faqTitleBig}>FAQ</p><h2 className={styles.faqTitleSub}>자주 묻는 질문</h2></div>
      <div className={styles.faqCard}>{FAQS.map(item => <details className={styles.faqItem} key={item.q}><summary className={styles.faqQ}><span className={styles.faqQMark} aria-hidden="true">Q.</span><span className={styles.faqQText}>{item.q}</span><span className={styles.faqExpand} aria-hidden="true">+</span></summary><div className={styles.faqA}><span className={styles.faqAMark} aria-hidden="true">A.</span><p className={styles.faqAText}>{item.a}</p></div></details>)}</div>
    </section>
  </>;
}
