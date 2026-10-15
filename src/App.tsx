
import { useState } from "react";
import ProjectsModal from "./components/ProjectsModal";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Reveal from "./components/Reveal";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const openProjects = () => {
    setProjectsOpen(true);
    setMenuOpen(false);
  };

  const closeProjects = () => {
    setProjectsOpen(false);
  };

  return (
    <>
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
            lajos<span>.</span>
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
          <section className="hero" id="home">
            <div className="hero-content hero-enter">
              <div className="eyebrow">
                <span className="status-dot"></span>
                SOFTWARE DEVELOPER
              </div>

              <h1>
                Building things
                <br />
                for the <span>web.</span>
              </h1>

              <p>
                Exploring software development through
                thoughtful interfaces and practical ideas.
              </p>
            </div>

            <a className="explore" href="#work">
              <span className="explore-icon">↓</span>
              <span>Explore selected work</span>
            </a>

            <div className="hero-index">01 — 03</div>
          </section>

          {/* Selected projects */}
          <section className="work-section" id="work">
            <Reveal>
              <div className="section-heading">
                <span>01 / SELECTED WORK</span>
                <span>2026</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <button
                type="button"
                className="projects-launcher"
                onClick={openProjects}
                aria-haspopup="dialog"
                aria-label="Explore projects"
              >
                {/* Dark left panel */}
                <div className="projects-launcher-left">
                  <span className="projects-launcher-label">
                    01 / SELECTED WORK
                  </span>

                  <div className="projects-launcher-text">
                    <h2>Selected Projects.</h2>
                    <p>
                      Ideas, experiments and applications
                      I've built.
                    </p>
                  </div>

                  <span className="projects-launcher-cta">
                    Explore projects
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>

                {/* Pink right panel with flat folder icon */}
                <div
                  className="projects-launcher-right"
                  aria-hidden="true"
                >
                  <svg
                    className="projects-folder-icon"
                    viewBox="0 0 120 110"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 28C12 23 16 19 21 19H47L59 32H99C104 32 108 36 108 41V88C108 93 104 97 99 97H21C16 97 12 93 12 88V28Z"
                      fill="#fa7cbe"
                    />
                  </svg>
                </div>
              </button>
            </Reveal>
          </section>

          {/* About section */}
          <section className="about-section" id="about">
            <Reveal>
              <span className="section-label">
                02 / ABOUT
              </span>

              <h2>
                Curious by nature.
                <br />
                Developer by choice.
              </h2>

              <div className="about-content">
                <p>
                  I'm a software developer with a
                  background in customer support and a
                  passion for building practical digital
                  experiences.
                </p>

                <p>
                  After completing my software development
                  training, I've been expanding my skills
                  through hands-on projects using React,
                  TypeScript, Python, C# and modern web
                  technologies.
                </p>

                <p>
                  I enjoy problem-solving, continuous
                  learning and turning ideas into
                  functional applications.
                </p>
              </div>

              <div className="about-skills">
                <span>React</span>
                <span>TypeScript</span>
                <span>JavaScript</span>
                <span>Python</span>
                <span>C# / .NET</span>
                <span>Django</span>
                <span>SQL</span>
                <span>Git</span>
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
                03 / CONTACT
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
                <a href="mailto:lajos.viktor.raczempek@gmail.com">
                  Get in touch ↗
                </a>

                <a
                  href="https://github.com/raczempeklajos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </Reveal>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <span>© 2026 lajos.</span>
          <span>Designed &amp; built with care.</span>
        </footer>
      </div>
    </>
  );
}

export default App;
