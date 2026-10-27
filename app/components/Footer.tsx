"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link href="https://www.korhrdcorp.co.kr" target="_blank">
          <div className={styles.footerLogo}>
            <span className={styles.logoText}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="BaroCompany Logo" width={420} height={123} loading="lazy" decoding="async" />
            </span>
          </div>
        </Link>
        <div className={styles.footerInfo}>
          <p className={styles.infoLine}>
            대표자 : 양병웅 | 개인정보보호책임자 : 양병웅
          </p>
          <p className={styles.infoLine}>
            사업자명 : (주)한평생그룹 | 사업자등록번호 : 227-88-03196
          </p>
          <p className={styles.infoLine}>
            통신판매신고 : 제2024-서울도봉-0983호
          </p>
          <p className={styles.infoLine}>
            주소 : 경기도 의정부시 의정부동 486-11, 601호 일부
          </p>
          <p className={styles.infoLine}>
            수강신청 문의 : 1661-7769 | 학습지원 문의 : 1661-7768
          </p>
          <p className={styles.infoLine}>이메일 : hpsedu20@naver.com</p>
          <div className={styles.footerLinks}>
            <Link href="/terms" className={styles.footerLink}>
              이용약관
            </Link>
            <span className={styles.divider}>|</span>
            <Link href="/privacy" className={styles.footerLink}>
              개인정보처리방침
            </Link>
          </div>
          <p className={styles.copyright}>
            2026 Korhrd Group Co., Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
