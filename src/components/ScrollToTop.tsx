
import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

// Manages scroll position when navigating between routes or page sections.
function ScrollToTop() {
  // Retrieves the current URL path and hash fragment from React Router.
  const { pathname, hash } = useLocation();

  // Updates the scroll position before the browser paints the new view.
  useLayoutEffect(() => {
    // Disables the browser's automatic scroll restoration.
    window.history.scrollRestoration = "manual";

    // Scrolls to the target section when the URL contains a hash.
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
      });

      // Cancels the scheduled scroll if the effect is cleaned up.
      return () => cancelAnimationFrame(frame);
    }

    // Scrolls to the top-left corner when navigating without a hash.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, hash]);

  // This component only manages scroll behavior and renders no UI.
  return null;
}

export default ScrollToTop;
