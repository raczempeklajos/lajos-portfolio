
import { useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";
import "./Toolbar.css";

// Renders the portfolio search toolbar and controls the command palette.
export default function Toolbar() {
  // Tracks whether the command palette is currently open.
  const [searchOpen, setSearchOpen] = useState(false);

  // Registers global keyboard shortcuts for opening and closing the search.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggles the command palette with Cmd+K (macOS)
      // or Ctrl+K (Windows and Linux).
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }

      // Closes the command palette when Escape is pressed.
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    // Listens for keyboard events across the entire page.
    window.addEventListener("keydown", handleKeyDown);

    // Removes the event listener when the component unmounts.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Toolbar containing the search button */}
      <div className="portfolio-toolbar">
        <button
          className="toolbar-search"
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
          aria-keyshortcuts="Meta+K Control+K"
          title="Search"
        >
          {/* Search icon rendered as an inline SVG */}
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

          {/* Tooltip displaying the keyboard shortcut */}
          <span className="toolbar-tooltip">
            Search <kbd>⌘ K</kbd>
          </span>
        </button>
      </div>

      {/* Passes the current visibility state and close handler
          to the command palette component. */}
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
