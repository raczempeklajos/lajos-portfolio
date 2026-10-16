
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Defines the properties supported by the Reveal component.
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  repeat?: boolean;
};

// Animates child elements when they enter the viewport.
function Reveal({
  children,
  className = "",
  delay = 0,
  repeat = true,
}: RevealProps) {
  // References the DOM element observed for visibility changes.
  const elementRef = useRef<HTMLDivElement>(null);

  // Tracks whether the element is currently visible in the viewport.
  const [isVisible, setIsVisible] = useState(false);

  // Observes the element and updates its visibility state.
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Uses the Intersection Observer API to detect viewport entry and exit.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Activates the reveal animation when the element becomes visible.
          setIsVisible(true);

          // Stops observing after the first reveal if repetition is disabled.
          if (!repeat) {
            observer.unobserve(entry.target);
          }
        } else if (repeat) {
          // Resets the animation when the element leaves the viewport.
          setIsVisible(false);
        }
      },
      {
        // Triggers when at least 10% of the element is visible.
        threshold: 0.1,

        // Reduces the effective viewport by 30px at the bottom.
        rootMargin: "0px 0px -30px 0px",
      }
    );

    // Starts monitoring the referenced element.
    observer.observe(element);

    // Disconnects the observer when the component unmounts
    // or when the repeat property changes.
    return () => observer.disconnect();
  }, [repeat]);

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Renders the content with the configured reveal animation. */}
      {children}
    </div>
  );
}

export default Reveal;
