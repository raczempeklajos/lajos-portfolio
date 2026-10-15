
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./CommandPalette.css";

type Command = {
  label: string;
  description: string;
  path: string;
  category: string;
};

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

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({
  open,
  onClose,
}: Props) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = commands.filter((command) =>
    `${command.label} ${command.description} ${command.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;

    setQuery("");
    setSelectedIndex(0);

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const runCommand = (command: Command) => {
    onClose();

    if (command.path.startsWith("/#")) {
      const id = command.path.slice(2);

      navigate(`/#${id}`);

      if (window.location.pathname === "/") {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
          });
        });
      }

      return;
    }

    navigate(command.path);
  };

  if (!open) return null;

  return (
    <div
      className="command-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search and navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onClose();
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex((index) =>
              Math.min(index + 1, filtered.length - 1)
            );
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex((index) =>
              Math.max(index - 1, 0)
            );
          }

          if (
            event.key === "Enter" &&
            filtered[selectedIndex]
          ) {
            runCommand(filtered[selectedIndex]);
          }
        }}
      >
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
                <span className="command-result-icon">
                  {command.category === "Projects"
                    ? "◇"
                    : "↗"}
                </span>

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

        <div className="command-footer">
          <span>↑ ↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
