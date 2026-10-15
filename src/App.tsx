
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link } from "react-router";

import ChessPreview from "./components/ChessPreview";
import PetMedicalPreview from "./components/PetMedicalPreview";
import Reveal from "./components/Reveal";

import "./App.css";

type ProjectPreview = "chess" | "pet" | null;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePreview, setActivePreview] =
    useState<ProjectPreview>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  const animationFrame = useRef<number | null>(null);
  const positionInitialized = useRef(false);

  // Update the preview target based on cursor position.
  const handlePreviewMove = (
    event: MouseEvent<HTMLElement>,
    project: "chess" | "pet"
  ) => {
    const preview = previewRef.current;

    if (!preview) return;

    const margin = 16;
    const offset = 24;

    const width = preview.offsetWidth;
    const height = preview.offsetHeight;

    const x = Math.max(
      margin,
      Math.min(
        event.clientX + offset,
        window.innerWidth - width - margin
      )
    );

    const y = Math.max(
      margin,
      Math.min(
        event.clientY + offset,
        window.innerHeight - height - margin
      )
    );

    targetPosition.current = { x, y };

    // Prevent the preview from flying in from the corner.
    if (!positionInitialized.current) {
      currentPosition.current = { x, y };

      preview.style.transform =
        `translate3d(${x}px, ${y}px, 0)`;

      positionInitialized.current = true;
    }

    setActivePreview((current) =>
      current === project ? current : project
    );
  };

  // Hide the preview when the cursor leaves a project.
  const handlePreviewLeave = () => {
    setActivePreview(null);
    positionInitialized.current = false;
  };

  // Smooth cursor-following animation.
  useEffect(() => {
    const animate = () => {
      const current = currentPosition.current;
      const target = targetPosition.current;

      const easing = 0.12;

      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;

      if (
        previewRef.current &&
        positionInitialized.current
      ) {
        previewRef.current.style.transform =
          `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      animationFrame.current =
        requestAnimationFrame(animate);
    };

    animationFrame.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div className="portfolio">

      {/* Shared floating project preview */}
      <div
        ref={previewRef}
        className={`floating-preview ${
          activePreview ? "visible" : ""
        }`}
        aria-hidden="true"
      >
        {activePreview === "chess" && <ChessPreview />}
        {activePreview === "pet" && <PetMedicalPreview />}
      </div>

      {/* Navigation */}
      <header className="header">
        <a href="#home" className="logo">
          lajos<span>.</span>
        </a>

        <button
          className="menu-toggle"
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

          {/* ChessGame project */}
          <Reveal delay={80}>
            <Link
              className="project chess-project"
              to="/projects/chessgame"
              onMouseMove={(event) =>
                handlePreviewMove(event, "chess")
              }
              onMouseLeave={handlePreviewLeave}
            >
              <div>
                <h2>ChessGame</h2>
                <p>Full-stack chess application</p>
              </div>

              <span className="project-arrow">↗</span>
            </Link>
          </Reveal>

          
        {/* Pet Medical System project */}
        <Reveal delay={160}>
          <Link
            className="project pet-project"
            to="/projects/pet-medical-system"
            onMouseMove={(event) =>
              handlePreviewMove(event, "pet")
            }
            onMouseLeave={handlePreviewLeave}
          >
            <div>
              <h2>Pet Medical System</h2>
              <p>Veterinary management application</p>
            </div>

            <span className="project-arrow">↗</span>
          </Link>
        </Reveal>


        </section>

        
      {/* About section */}
      <section className="about-section" id="about">
        <Reveal>
          <span className="section-label">02 / ABOUT</span>

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
              projects using React, TypeScript, Python, C#
              and modern web technologies.
            </p>

            <p>
              I enjoy problem-solving, continuous learning
              and turning ideas into functional applications.
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
    <section className="contact-section" id="contact">
      <Reveal>
        <span className="section-label">03 / CONTACT</span>

        <h2>
          Have something
          <br />
          in mind<span>?</span>
        </h2>

        <p>
          I'm open to new opportunities, collaborations
          and interesting projects.
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
        <span>Designed & built with care.</span>
      </footer>

    </div>
  );
}

export default App;
