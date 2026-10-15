
import { useEffect } from "react";
import { Link } from "react-router";
import "./ProjectsModal.css";

type ProjectsModalProps = {
  open: boolean;
  onClose: () => void;
};

const projects = [
  {
    number: "01",
    title: "ChessGame",
    description:
      "A console-based chess application developed with C# and .NET.",
    stack: ["C#", ".NET", "OOP", "xUnit"],
    path: "/projects/chessgame",
  },
  {
    number: "02",
    title: "Pet Medical System",
    description:
      "A veterinary management platform built with React and Django REST.",
    stack: ["React", "JavaScript", "Python", "Django"],
    path: "/projects/pet-medical-system",
  },
];

export default function ProjectsModal({
  open,
  onClose,
}: ProjectsModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="projects-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="projects-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projects-modal-title"
      >
        <div className="projects-modal-header">
          <div>
            <span className="projects-modal-label">
              PORTFOLIO / 2026
            </span>
            <h2 id="projects-modal-title">
              Selected projects<span>.</span>
            </h2>
            <p>
              A collection of things I've built and
              explored.
            </p>
          </div>

          <button
            className="projects-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close projects"
          >
            ×
          </button>
        </div>

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
                <p>{project.description}</p>

                <div className="projects-modal-stack">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              <span className="projects-modal-arrow">
                ↗
              </span>
            </Link>
          ))}
        </div>

        <div className="projects-modal-footer">
          <span>SELECT A PROJECT TO EXPLORE</span>
          <span>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
