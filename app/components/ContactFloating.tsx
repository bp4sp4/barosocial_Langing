import styles from "./ContactFloating.module.css";

type ContactFloatingProps = {
  channelUrl: string;
  phoneNumber: string;
  raised: boolean;
  hidden: boolean;
};

export default function ContactFloating({ channelUrl, phoneNumber, raised, hidden }: ContactFloatingProps) {
  return (
    <nav className={styles.group} aria-label="빠른 상담" data-raised={raised} hidden={hidden}>
      <a
        id="floating-phone-button"
        className={styles.button}
        href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
        aria-label={`전화 상담하기 ${phoneNumber}`}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="M7.2 3H4.8A1.8 1.8 0 0 0 3 4.9C3.8 13.5 10.5 20.2 19.1 21a1.8 1.8 0 0 0 1.9-1.8v-2.4a1.2 1.2 0 0 0-.9-1.2l-3-.8a1.2 1.2 0 0 0-1.2.3l-1.4 1.4a15.7 15.7 0 0 1-7-7L8.9 8a1.2 1.2 0 0 0 .3-1.2l-.8-3A1.2 1.2 0 0 0 7.2 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span>전화상담</span>
      </a>
      <a
        id="kakao-add-channel-button"
        className={`${styles.button} ${styles.kakaoButton}`}
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 채널 열기 (새 창)"
      >
        <svg className={styles.icon} viewBox="0 0 40 36" aria-hidden="true" focusable="false">
          <path d="M20 2C9.5 2 1 8.7 1 17c0 5.3 3.4 9.9 8.5 12.5L8 35l7-3.6c1.6.4 3.3.6 5 .6 10.5 0 19-6.7 19-15S30.5 2 20 2Z" fill="currentColor" />
          <text x="20" y="22" textAnchor="middle" fill="#fee500" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700">Ch+</text>
        </svg>
        <span>카카오채널</span>
      </a>
    </nav>
  );
}
