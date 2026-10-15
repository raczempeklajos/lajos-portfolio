
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div
      className={`page-transition ${
        visible ? "page-transition-visible" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default PageTransition;
