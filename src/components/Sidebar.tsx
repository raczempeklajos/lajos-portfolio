
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./Sidebar.css";

// Defines the structure of a navigable portfolio section.
type Section = {
  id: string;
  label: string;
};

// Stores the homepage sections displayed in the sidebar navigation.
const sections: Section[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// Renders the sidebar navigation and tracks the currently active section.
function Sidebar() {
  // Stores the ID of the section currently highlighted in the sidebar.
  const [activeSection, setActiveSection] =
    useState("home");

  // Provides access to the current route and programmatic navigation.
  const location = useLocation();
  const navigate = useNavigate();

  // Updates the active section based on the user's scroll position.
  useEffect(() => {
    // Only tracks homepage sections when the current route is the homepage.
    if (location.pathname !== "/") return;

    const updateActiveSection = () => {
      // Uses a point 40% down the viewport to determine the active section.
      const scrollPosition =
        window.scrollY + window.innerHeight * 0.4;

      // Defaults to the home section before checking other sections.
      let currentSection = "home";

      // Finds the last section whose top position has been reached.
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

      // Updates the highlighted navigation item.
      setActiveSection(currentSection);
    };

    // Determines the active section when the component initializes.
    updateActiveSection();

    // Tracks scrolling without blocking the browser's scroll handling.
    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true }
    );

    // Recalculates the active section when the viewport size changes.
    window.addEventListener(
      "resize",
      updateActiveSection
    );

    // Removes event listeners when the component unmounts
    // or the current route changes.
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

  // Navigates to the selected homepage section.
  const handleNavigation = (id: string) => {
    // Returns to the homepage when navigating from another route.
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    // Smoothly scrolls to the selected section on the homepage.
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <aside className="craft-sidebar">
      {/* Sidebar navigation containing all homepage sections */}
      <nav
        className="sidebar-navigation"
        aria-label="Section navigation"
      >
        {/* Generates a navigation button for each section */}
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
            {/* Visual indicator for the navigation item */}
            <span className="sidebar-line" />

            {/* Displays the section name as a tooltip */}
            <span className="sidebar-tooltip">
              {section.label}
            </span>

            {/* Displays the section number using two digits */}
            <span className="sidebar-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </nav>

      {/* Sidebar footer displaying the portfolio year */}
      <div className="sidebar-bottom">
        <span>2026</span>
      </div>
    </aside>
  );
}

export default Sidebar;
