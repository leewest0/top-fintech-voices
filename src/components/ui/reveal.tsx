"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and lifts its children into place the first time they scroll into view.
 *
 * The visible flag is written straight to the DOM rather than held in state:
 * it drives nothing but a CSS selector, so a re-render would be wasted work.
 * The matching `.js .reveal` rules only apply once the bootstrap script marks
 * the document as scripted, so with no JS the content simply renders.
 */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.dataset.visible = "true";
    };

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-visible="false"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
