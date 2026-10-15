
import { useEffect, useState } from "react";
import "./IntroAnimation.css";

function IntroAnimation() {
  const [visible, setVisible] = useState(
    () => !sessionStorage.getItem("portfolio-intro-seen")
  );
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(
    () => setLeaving(true),
    reducedMotion ? 100 : 2700
    );

    const removeTimer = window.setTimeout(
    () => {
        sessionStorage.setItem("portfolio-intro-seen", "true");
        setVisible(false);
    },
    reducedMotion ? 150 : 3500
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`intro-screen ${leaving ? "intro-leaving" : ""}`}
      aria-label="Welcome to Ráczempek Lajos's portfolio"
    >
      <div className="intro-top">
        <span>SOFTWARE DEVELOPER</span>
        <span>2026</span>
      </div>

      <div className="intro-center">
        <h1 className="intro-name">
          <span>Ráczempek</span>
          <span className="intro-name-last">
            Lajos<span className="intro-accent">.</span>
          </span>
        </h1>
      </div>

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
