
import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
      });

      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
