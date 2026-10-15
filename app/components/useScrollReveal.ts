"use client";

import { useEffect, type RefObject } from "react";

export default function useScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root) return;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "")) {
      root.dataset.motion = "light";
      return () => { delete root.dataset.motion; };
    }
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      entries => {
        const entering = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);

        entering.forEach((entry, index) => {
          const element = entry.target as HTMLElement;
          if (element.dataset.revealState !== "pending") return;
          element.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 85}ms`);
          element.dataset.revealState = "visible";
          observer.unobserve(element);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    // Server-rendered content stays visible without JS. Only prepare content below the viewport.
    targets.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight - 24) {
        element.dataset.revealState = "settled";
      } else {
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    });

    const clear = () => {
      observer.disconnect();
      targets.forEach(element => {
        delete element.dataset.revealState;
        element.style.removeProperty("--reveal-delay");
      });
    };

    const onPreferenceChange = () => {
      if (preference.matches) clear();
    };

    // Keyboard navigation must never land on an invisible control.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (element && root.contains(element)) {
        element.dataset.revealState = "settled";
        observer.unobserve(element);
      }
    };

    preference.addEventListener("change", onPreferenceChange);
    root.addEventListener("focusin", onFocus);
    return () => {
      clear();
      preference.removeEventListener("change", onPreferenceChange);
      root.removeEventListener("focusin", onFocus);
    };
  }, [rootRef]);
}
