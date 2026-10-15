"use client";

import styles from "../landing.module.css";

export default function ConsultationSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.successOverlay} onClick={onClose}>
      <div className={styles.successCard} role="dialog" aria-modal="true" aria-labelledby="consult-done-title" aria-describedby="consult-done-description" onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.successClose} onClick={onClose} aria-label="닫기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <div className={styles.successIllustration} aria-hidden="true">
          <span className={styles.successSparkle}>✦</span>
          <span className={styles.successDot} />
          <div className={styles.successCheck}>
            <svg width="46" height="46" viewBox="0 0 48 48" fill="none"><path d="m12 24 8 8 17-18" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" /></svg>
          </div>
        </div>
        <h2 id="consult-done-title" className={styles.successTitle}>상담 신청이<br />완료되었어요</h2>
        <p id="consult-done-description" className={styles.successDescription}>남겨주신 연락처로<br />한평생 담당자가 연락드릴게요.</p>
        <div className={styles.successReassurance}>
          <strong>궁금한 점을 편하게 말씀해주세요.</strong>
          <p>충분히 알아보신 뒤 결정하셔도 괜찮아요.</p>
        </div>
        <button type="button" className={styles.successConfirm} onClick={onClose}>확인했어요</button>
      </div>
    </div>
  );
}
