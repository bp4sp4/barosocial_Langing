import Image from "next/image";
import styles from "../landing.module.css";

const CONSULTATION_STEPS = [
  {
    icon: "💬",
    title: "지금 내 상황을 이야기해요.",
    description: "학력과 공부에 낼 수 있는 시간, 가장 걱정되는 점을 알려주세요.",
  },
  {
    icon: "📝",
    title: "내게 필요한 준비를 확인해요.",
    description: "어떤 과정을 거치는지, 기간과 비용은 얼마나 필요한지 알아보세요.",
  },
  {
    icon: "🌱",
    title: "설명을 듣고 천천히 결정해요.",
    description: "내 생활과 병행할 수 있을지 살펴보고 시작 여부를 정하세요.",
  },
];

export default function ConsultationIntro({ onConsult }: { onConsult: () => void }) {
  return (
    <div className={styles.consultIntro}>
      <div className={styles.consultPhotoHeader}>
        <Image
          src="/consultation-new-start.png"
          alt="집에서 공부하다 창밖을 바라보며 새로운 시작을 생각하는 중년 여성의 연출 이미지"
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          className={styles.consultPhoto}
        />
        <div className={styles.consultPhotoVeil} aria-hidden="true" />
        <h2 className={styles.consultIntroTitle} id="consult-title" data-reveal="heading">
          나도 할 수 있을까요?<br />
          <span>그 고민부터 <em>함께 풀어드릴게요.</em></span>
        </h2>
      </div>

      <div className={styles.consultIntroContent}>
        <div className={styles.consultEmpathy}>
          <p>공부도, 집안일도, 비용도 걱정되시나요?<br />지금 상황을 편하게 말씀해주세요.<br />내게 필요한 준비와 기간·비용을 알려드릴게요.</p>
          <p>상담을 받는다고 바로 시작하실 필요는 없어요.<br /><strong>충분히 알아보신 뒤, 나에게 맞는지 결정하세요.</strong></p>
        </div>

        <ol className={styles.consultDetailedSteps} aria-label="상담 진행 3단계">
          {CONSULTATION_STEPS.map((step) => (
            <li key={step.title}>
              <span className={styles.consultStepIcon} aria-hidden="true">{step.icon}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>

        <button type="button" className={`${styles.sectionConsultBtn} ${styles.consultIntroButton}`} onClick={onConsult} data-reveal="action">
          내 상황에 맞는 준비 방법 상담받기
        </button>
      </div>
    </div>
  );
}
