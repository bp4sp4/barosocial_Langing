"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 네이버페이 리워드(엔비티 AdiSON) 광고 유입 — utm_source 를 붙여 메인 폼으로 넘긴다 (오피스 문의 DB 대분류 "네이버리워드")
// 매체가 붙여주는 click_key 는 포스트백 연동에 필요하므로 그대로 넘긴다.
function NaverRewardRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const clickKey = searchParams.get("click_key");
    const query =
      "/?utm_source=naverreward&utm_medium=reward&utm_campaign=recruitment" +
      (clickKey ? `&click_key=${encodeURIComponent(clickKey)}` : "");
    router.replace(query);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">이동 중...</p>
      </div>
    </div>
  );
}

export default function NaverRewardPage() {
  return (
    <Suspense fallback={null}>
      <NaverRewardRedirect />
    </Suspense>
  );
}
