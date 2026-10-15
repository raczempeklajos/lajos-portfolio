
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./Sidebar.css";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function Sidebar() {
  const [activeSection, setActiveSection] =
    useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const updateActiveSection = () => {
      const scrollPosition =
        window.scrollY + window.innerHeight * 0.4;

      let currentSection = "home";

      sections.forEach((section) => {
        const element =
          document.getElementById(section.id);

        if (
          element &&
          element.offsetTop <= scrollPosition
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );

      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, [location.pathname]);

  const handleNavigation = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
            <aside className="craft-sidebar">
        <nav
        className="sidebar-navigation"
        aria-label="Section navigation"
      >
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className={`sidebar-item ${
              activeSection === section.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigation(section.id)
            }
            aria-label={section.label}
            aria-current={
              location.pathname === "/" &&
              activeSection === section.id
                ? "location"
                : undefined
            }
          >
            <span className="sidebar-line" />

            <span className="sidebar-tooltip">
              {section.label}
            </span>

            <span className="sidebar-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <span>2026</span>
      </div>
    </aside>
  );
}

export default Sidebar;
