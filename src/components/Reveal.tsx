
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  repeat?: boolean;
};

function Reveal({
  children,
  className = "",
  delay = 0,
  repeat = true,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (!repeat) {
            observer.unobserve(entry.target);
          }
        } else if (repeat) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [repeat]);

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
