import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/font-subsets.css";
import "../styles/base.css";
import "../styles/layout.css";
import "../styles/components.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// 당근마켓 전환 추적 코드 ID (코드명 "주부랜딩페이지")
const KARROT_PIXEL_ID = "1789719652963286001";

export const metadata: Metadata = {
  title: "한평생그룹 무료상담",
  description: "한평생그룹 무료상담",
  openGraph: {
    title: "한평생그룹 무료상담",
    description: "한평생그룹 무료상담",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 540,
        alt: "한평생그룹 무료상담",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "한평생그룹 무료상담",
    description: "한평생그룹 무료상담",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PSNS22ZZ');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* 당근마켓 전환 추적 코드 — 코드명 "주부랜딩페이지" */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (w, d) {
  if (w.karrotPixel) return;
  var k = { stub: true, queue: [] };
  k.init = function () { k.queue.push(['init', arguments, Date.now()]); };
  k.track = function () { k.queue.push(['track', arguments, Date.now()]); };
  w.karrotPixel = k;
  var s = d.createElement('script');
  s.async = true;
  s.src = 'https://karrot-pixel.business.daangn.com/karrot-pixel.js';
  var f = d.getElementsByTagName('script')[0];
  f && f.parentNode ? f.parentNode.insertBefore(s, f) : d.head.appendChild(s);
})(window, document);
window.karrotPixel.init('${KARROT_PIXEL_ID}');
window.karrotPixel.track('ViewPage');`,
          }}
        />
        {/* End 당근마켓 전환 추적 코드 */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PSNS22ZZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
