
import { useEffect } from "react";
import { Link } from "react-router";
import { useLanguage } from "../LanguageContext";
import "./ProjectsModal.css";

// Defines the properties required to control the modal.
type ProjectsModalProps = {
  open: boolean;
  onClose: () => void;
};

// Stores the projects displayed in the modal.
// Each project includes localized descriptions, technologies, and a route.
const projects = [
  {
    number: "01",
    title: "ChessGame",
    description: {
      en: "A console-based chess application developed with C# and .NET.",
      hu: "C# és .NET használatával készült, konzolos sakkalkalmazás.",
    },
    stack: ["C#", ".NET", "OOP", "xUnit"],
    path: "/projects/chessgame",
  },
  {
    number: "02",
    title: "Pet Medical System",
    description: {
      en: "A veterinary management platform built with React and Django REST.",
      hu: "React és Django REST alapú alkalmazás az állatorvosi ügyintézés támogatására.",
    },
    stack: ["React", "JavaScript", "Python", "Django"],
    path: "/projects/pet-medical-system",
  },
];

// Renders a modal containing the portfolio's selected projects.
export default function ProjectsModal({
  open,
  onClose,
}: ProjectsModalProps) {
  // Retrieves the currently selected language.
  const { language } = useLanguage();

  // Handles keyboard interaction and prevents background scrolling
  // while the modal is open.
  useEffect(() => {
    if (!open) return;

    // Closes the modal when the Escape key is pressed.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    // Stores the original scroll setting before locking the page.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    // Restores scrolling and removes the event listener on cleanup.
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Prevents rendering the modal when it is closed.
  if (!open) return null;

  return (
    // Closes the modal when clicking directly on the overlay.
    <div
      className="projects-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* Accessible dialog container */}
      <div
        className="projects-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projects-modal-title"
      >
        {/* Modal header with localized text and close button */}
        <div className="projects-modal-header">
          <div>
            <span className="projects-modal-label">
              PORTFOLIO / 2026
            </span>

            <h2 id="projects-modal-title">
              {language === "hu"
                ? "Kiemelt projektek"
                : "Selected projects"}
              <span>.</span>
            </h2>

            <p>
              {language === "hu"
                ? "Néhány projekt, amelyen dolgoztam, és amelyeken keresztül új technológiákat ismertem meg."
                : "A collection of things I've built and explored."}
            </p>
          </div>

          <button
            className="projects-modal-close"
            type="button"
            onClick={onClose}
            aria-label={
              language === "hu"
                ? "Projektablak bezárása"
                : "Close projects"
            }
          >
            ×
          </button>
        </div>

        {/* Dynamically generates project cards from the projects array */}
        <div className="projects-modal-list">
          {projects.map((project) => (
            <Link
              key={project.number}
              to={project.path}
              className="projects-modal-item"
              onClick={onClose}
            >
              <span className="projects-modal-number">
                {project.number}
              </span>

              <div className="projects-modal-item-content">
                <h3>{project.title}</h3>

                {/* Displays the description in the selected language */}
                <p>{project.description[language]}</p>

                {/* Renders the technology tags for each project */}
                <div className="projects-modal-stack">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Modal footer with navigation instructions */}
        <div className="projects-modal-footer">
          <span>
            {language === "hu"
              ? "VÁLASSZ EGY PROJEKTET"
              : "SELECT A PROJECT TO EXPLORE"}
          </span>

          <span>
            {language === "hu"
              ? "ESC – BEZÁRÁS"
              : "ESC TO CLOSE"}
          </span>
        </div>
      </div>
    </div>
  );
}
