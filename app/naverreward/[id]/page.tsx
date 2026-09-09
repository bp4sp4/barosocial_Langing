"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

// 네이버페이 리워드 소재별 유입 — /naverreward/{소재코드} → click_source "네이버리워드_소재_{코드}"
// 매체가 붙여주는 click_key 는 포스트백 연동에 필요하므로 그대로 넘긴다.
function NaverRewardMaterialRedirect() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const materialId = params.id as string;
    const clickKey = searchParams.get("click_key");
    const clickKeyQuery = clickKey
      ? `&click_key=${encodeURIComponent(clickKey)}`
      : "";

    if (materialId) {
      router.replace(
        `/?utm_source=naverreward&utm_medium=reward&utm_campaign=material_${materialId}&material_id=${materialId}${clickKeyQuery}`
      );
    } else {
      router.replace(
        `/?utm_source=naverreward&utm_medium=reward&utm_campaign=recruitment${clickKeyQuery}`
      );
    }
  }, [router, params, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">이동 중...</p>
      </div>
    </div>
  );
}

export default function NaverRewardMaterialPage() {
  return (
    <Suspense fallback={null}>
      <NaverRewardMaterialRedirect />
    </Suspense>
  );
}
