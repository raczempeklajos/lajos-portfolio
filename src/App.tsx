
import { useEffect, useRef, useState } from "react";
import ProjectsModal from "./components/ProjectsModal";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Reveal from "./components/Reveal";
import IntroAnimation from "./components/IntroAnimation";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDjango,
  SiGit,
  SiDotnet,
} from "react-icons/si";

import { FaDatabase } from "react-icons/fa";

import "./App.css";

function App() {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactCloseRef = useRef<HTMLButtonElement>(null);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  const openProjects = () => {
    setProjectsOpen(true);
    setMenuOpen(false);
  };

  const closeProjects = () => {
    setProjectsOpen(false);
  };

  useEffect(() => {
    if (!contactOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contactCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
      }

      if (event.key === "Tab") {
        const modal = document.querySelector<HTMLElement>(
          ".contact-modal"
        );

        if (!modal) return;

        const elements = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href]'
          )
        );

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      contactTriggerRef.current?.focus();
    };
  }, [contactOpen]);

    return (
    <>
      <IntroAnimation />

      {/* Fixed sidebar navigation */}
      <Sidebar />

      {/* Search toolbar and command palette */}
      <Toolbar />

      {/* Projects selection modal */}
      <ProjectsModal
        open={projectsOpen}
        onClose={closeProjects}
      />

      <div className="portfolio">
        {/* Navigation */}
        <header className="header">
          <a href="#home" className="logo">
            Ráczempek Lajos
          </a>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <nav
            className={
              menuOpen ? "navigation open" : "navigation"
            }
          >
            <a
              href="#work"
              onClick={() => setMenuOpen(false)}
            >
              Work
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </header>

        <main>
          {/* Hero section */}
          
<section className="hero hero-redesign" id="home">
  <div className="hero-layout">
    <div className="hero-copy">
      <div className="eyebrow">
        <span className="status-dot" />
        SOFTWARE DEVELOPER
      </div>

      <h1>
        Turning ideas
        <br />
        into <span>real stuff.</span>
      </h1>

      <p>
        I'm Ráczempek Lajos, a software developer
        passionate about building thoughtful digital
        experiences and turning creative ideas into
        working solutions.
      </p>

      <a href="#work" className="hero-work-link">
      Explore my work
      <span aria-hidden="true">↓</span>
    </a>
    </div>

    <div className="hero-visual">
      <div className="hero-photo-backdrop" />

      <div className="hero-photo-frame">
        <img
          src="/hero-portrait.png"
          alt="Portrait of Ráczempek Lajos"
          className="hero-portrait"
        />
      </div>

      <span className="hero-photo-label">
        BEHIND THE CODE / 2026
      </span>

      <span className="hero-photo-cross" aria-hidden="true">
        +
      </span>
    </div>
  </div>

  <div className="hero-bottom">
    <span>CREATIVE THINKING. PRACTICAL BUILDING.</span>
    <span>01 / 04</span>
  </div>
</section>

          {/* Selected projects */}
          <section className="work-section" id="work">
            <Reveal>
              <div className="section-heading">
                <span>02 / SELECTED WORK</span>
                <span>2026</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <button
                type="button"
                className="projects-launcher"
                onClick={openProjects}
                aria-haspopup="dialog"
                aria-label="Open projects: ChessGame and Pet Medical System"
              >
                <span className="projects-launcher-left">
                  <span className="projects-launcher-label">
                    02 PROJECTS
                  </span>
                  <span className="projects-launcher-text">
                    <h2>Projects</h2>
                    <p>
                      A collection of selected work, experiments
                      and applications.
                    </p>
                  </span>
                  <span className="projects-launcher-cta">
                  View projects
                </span>
                </span>
                <span className="projects-launcher-right" aria-hidden="true">
                  <svg
                    className="projects-folder-icon"
                    viewBox="0 0 160 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 29C13 23.477 17.477 19 23 19H61L75 33H137C142.523 33 147 37.477 147 43V107C147 112.523 142.523 117 137 117H23C17.477 117 13 112.523 13 107V29Z"
                      fill="#fa7cbe"
                      fillOpacity="0.14"
                      stroke="#fa7cbe"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path d="M13 48H147" stroke="#fa7cbe" strokeOpacity="0.55" strokeWidth="2" />
                  </svg>
                </span>
              </button>
            </Reveal>
          </section>

          {/* About section */}
        <section className="about-section" id="about">
          <Reveal>
            <span className="section-label">
              03 / ABOUT
            </span>

            <h2>
              Curious by nature.
              <br />
              Developer by choice.
            </h2>

            <div className="about-content">
              <p>
                I'm a software developer with a background in
                customer support and a passion for building
                practical digital experiences.
              </p>

              <p>
                After completing my software development training,
                I've been expanding my skills through hands-on
                projects using modern web technologies.
              </p>

              <button
                type="button"
                className="about-read-more"
                onClick={() => setAboutExpanded(!aboutExpanded)}
                aria-expanded={aboutExpanded}
                aria-controls="about-extra"
              >
                {aboutExpanded ? "Show less −" : "Read more +"}
              </button>

              {aboutExpanded && (
                <div
                  id="about-extra"
                  className="about-expanded"
                >
                  <div className="about-extra-item">
                    <span>01 / BACKGROUND</span>
                    <h3>People and technology.</h3>
                    <p>
                      My experience in customer support has helped
                      me develop communication, problem-solving
                      and analytical skills. Working with different
                      people and challenges has shaped how I
                      approach technical problems.
                    </p>
                  </div>

                  <div className="about-extra-item">
                    <span>02 / DEVELOPMENT</span>
                    <h3>Learning through building.</h3>
                    <p>
                      I enjoy understanding how applications work,
                      from frontend interfaces to backend logic.
                      My projects give me the opportunity to
                      explore different technologies and turn
                      ideas into functional solutions.
                    </p>
                  </div>

                  <div className="about-extra-item">
                    <span>03 / BEYOND CODE</span>
                    <h3>More than development.</h3>
                    <p>
                      Outside programming, I'm interested in
                      sports, photography, music and reading.
                      Playing music and working on creative
                      projects are important parts of my life.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="about-skills">
              <span><SiReact /> React</span>
              <span><SiTypescript /> TypeScript</span>
              <span><SiJavascript /> JavaScript</span>
              <span><SiPython /> Python</span>
              <span><SiDotnet /> C# / .NET</span>
              <span><SiDjango /> Django</span>
              <span><FaDatabase /> SQL</span>
              <span><SiGit /> Git</span>
            </div>
          </Reveal>
        </section>


          {/* Contact section */}
          <section
            className="contact-section"
            id="contact"
          >
            <Reveal>
              <span className="section-label">
                04 / CONTACT
              </span>

              <h2>
                Have something
                <br />
                in mind<span>?</span>
              </h2>

              <p>
                I'm open to new opportunities,
                collaborations and interesting projects.
              </p>

              <div className="contact-links">
                <button
                  ref={contactTriggerRef}
                  type="button"
                  className="contact-button"
                  onClick={() => setContactOpen(true)}
                >
                  Get in Touch
                </button>

                <a
                  href="https://github.com/raczempeklajos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button contact-button-secondary"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <span>© 2026 Ráczempek Lajos</span>
          <span>Designed &amp; built with care.</span>
        </footer>
      </div>

      {/* Contact modal */}
      {contactOpen && (
        <div
          className="contact-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setContactOpen(false);
            }
          }}
        >
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button
              ref={contactCloseRef}
              type="button"
              className="contact-modal-close"
              onClick={() => setContactOpen(false)}
              aria-label="Close contact window"
            >
              ×
            </button>

            <span className="section-label">
              LET'S CONNECT
            </span>

            <h2 id="contact-modal-title">
              Get in touch<span>.</span>
            </h2>

            <p>
              Interested in working together or have a
              question? Feel free to reach out.
            </p>

            <div className="contact-modal-links">
              <a href="mailto:lajos.viktor.raczempek@gmail.com">
                Send an email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
