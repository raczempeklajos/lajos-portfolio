
import { useEffect, useState } from "react";
import "./IntroAnimation.css";

// Displays an introductory animation when the portfolio is first opened.
function IntroAnimation() {
  // Shows the introduction only once per browser tab session.
  // The sessionStorage flag prevents it from replaying on page reload.
  const [visible, setVisible] = useState(
    () => !sessionStorage.getItem("portfolio-intro-seen")
  );

  // Tracks whether the exit animation has started.
  const [leaving, setLeaving] = useState(false);

  // Manages animation timing, accessibility preferences, and page scrolling.
  useEffect(() => {
    if (!visible) return;

    // Checks whether the user prefers reduced motion.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Prevents background scrolling while the introduction is visible.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Starts the exit animation after the introduction has been displayed.
    // Shorter delays are used when reduced motion is preferred.
    const exitTimer = window.setTimeout(
      () => setLeaving(true),
      reducedMotion ? 100 : 2700
    );

    // Marks the introduction as seen and removes it from the page.
    const removeTimer = window.setTimeout(
      () => {
        sessionStorage.setItem("portfolio-intro-seen", "true");
        setVisible(false);
      },
      reducedMotion ? 150 : 3500
    );

    // Clears pending timers and restores the original scrolling behavior.
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  // Prevents rendering once the introduction has finished.
  if (!visible) return null;

  return (
    <div
      className={`intro-screen ${leaving ? "intro-leaving" : ""}`}
      aria-label="Welcome to Ráczempek Lajos's portfolio"
    >
      {/* Introductory header displaying the developer role and year */}
      <div className="intro-top">
        <span>SOFTWARE DEVELOPER</span>
        <span>2026</span>
      </div>

      {/* Main animated title displaying the developer's name */}
      <div className="intro-center">
        <h1 className="intro-name">
          <span>Ráczempek</span>
          <span className="intro-name-last">
            Lajos<span className="intro-accent">.</span>
          </span>
        </h1>
      </div>

      {/* Footer with the portfolio label and visual progress indicator */}
      <div className="intro-bottom">
        <span>PORTFOLIO</span>

        <span className="intro-progress">
          <span />
        </span>

        <span>WELCOME</span>
      </div>
    </div>
  );
}

export default IntroAnimation;
