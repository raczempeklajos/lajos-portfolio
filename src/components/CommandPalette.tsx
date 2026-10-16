
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./CommandPalette.css";

// Defines the structure of a searchable navigation command.
type Command = {
  label: string;
  description: string;
  path: string;
  category: string;
};

// Stores the available navigation destinations and project pages.
const commands: Command[] = [
  {
    label: "Home",
    description: "Back to homepage",
    path: "/#home",
    category: "Navigation",
  },
  {
    label: "Selected Work",
    description: "Browse projects",
    path: "/#work",
    category: "Navigation",
  },
  {
    label: "About",
    description: "Learn more about me",
    path: "/#about",
    category: "Navigation",
  },
  {
    label: "Contact",
    description: "Get in touch",
    path: "/#contact",
    category: "Navigation",
  },
  {
    label: "ChessGame",
    description: "Full-stack chess application",
    path: "/projects/chessgame",
    category: "Projects",
  },
  {
    label: "Pet Medical System",
    description: "Veterinary management application",
    path: "/projects/pet-medical-system",
    category: "Projects",
  },
];

// Defines the properties used to control the command palette.
type Props = {
  open: boolean;
  onClose: () => void;
};

// Renders a searchable command palette with keyboard navigation.
export default function CommandPalette({
  open,
  onClose,
}: Props) {
  // Stores the search query and currently highlighted result.
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // References the search input for automatic focus management.
  const inputRef = useRef<HTMLInputElement>(null);

  // Provides programmatic navigation through React Router.
  const navigate = useNavigate();

  // Filters commands by label, description, or category.
  // The search is case-insensitive.
  const filtered = commands.filter((command) =>
    `${command.label} ${command.description} ${command.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // Resets the search and focuses the input whenever the palette opens.
  useEffect(() => {
    if (!open) return;

    setQuery("");
    setSelectedIndex(0);

    // Delays focusing until the input is rendered.
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    // Cancels the pending animation frame during cleanup.
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Resets the highlighted result when the search query changes.
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Executes the selected command and navigates to its destination.
  const runCommand = (command: Command) => {
    onClose();

    // Handles navigation to sections within the homepage.
    if (command.path.startsWith("/#")) {
      const id = command.path.slice(2);

      navigate(`/#${id}`);

      // Smoothly scrolls to the section when already on the homepage.
      if (window.location.pathname === "/") {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
          });
        });
      }

      return;
    }

    // Navigates directly to a standalone project page.
    navigate(command.path);
  };

  // Prevents rendering when the command palette is closed.
  if (!open) return null;

  return (
    <div
      className="command-overlay"
      onMouseDown={(event) => {
        // Closes the palette only when clicking outside the dialog.
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Accessible command palette dialog */}
      <div
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search and navigation"
        onKeyDown={(event) => {
          // Closes the palette with the Escape key.
          if (event.key === "Escape") {
            onClose();
          }

          // Moves the selection down without exceeding the result list.
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex((index) =>
              Math.min(index + 1, filtered.length - 1)
            );
          }

          // Moves the selection up without going below the first result.
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex((index) =>
              Math.max(index - 1, 0)
            );
          }

          // Executes the highlighted command when Enter is pressed.
          if (
            event.key === "Enter" &&
            filtered[selectedIndex]
          ) {
            runCommand(filtered[selectedIndex]);
          }
        }}
      >
        {/* Search input and close button */}
        <div className="command-search">
          <span aria-hidden="true">⌕</span>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search projects, pages..."
            aria-label="Search commands"
          />

          <button onClick={onClose} type="button">
            ESC
          </button>
        </div>

        {/* Displays matching commands or an empty-state message */}
        <div className="command-results">
          {filtered.length === 0 ? (
            <p className="command-empty">
              No results found.
            </p>
          ) : (
            filtered.map((command, index) => (
              <button
                type="button"
                key={command.path}
                className={`command-result ${
                  selectedIndex === index
                    ? "selected"
                    : ""
                }`}
                onMouseEnter={() =>
                  setSelectedIndex(index)
                }
                onClick={() => runCommand(command)}
              >
                {/* Uses different symbols for projects and navigation links */}
                <span className="command-result-icon">
                  {command.category === "Projects"
                    ? "◇"
                    : "↗"}
                </span>

                {/* Command title and description */}
                <span className="command-result-text">
                  <strong>{command.label}</strong>
                  <small>{command.description}</small>
                </span>

                <span className="command-result-arrow">
                  ↗
                </span>
              </button>
            ))
          )}
        </div>

        {/* Keyboard shortcut instructions */}
        <div className="command-footer">
          <span>↑ ↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
