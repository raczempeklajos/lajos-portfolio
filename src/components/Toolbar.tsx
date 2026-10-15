
import { useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";
import "./Toolbar.css";

export default function Toolbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="portfolio-toolbar">
        <button
          className="toolbar-search"
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
          aria-keyshortcuts="Meta+K Control+K"
          title="Search"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>

          <span className="toolbar-tooltip">
            Search <kbd>⌘ K</kbd>
          </span>
        </button>
      </div>

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
