
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
import { useLanguage } from "./LanguageContext";

// Centralized UI copy for the English and Hungarian versions of the portfolio.
// The active language determines which set of labels and descriptions is displayed.
const translations = {
  en: {
    menu: "Menu", close: "Close", work: "Work", about: "About", contact: "Contact",
    role: "SOFTWARE DEVELOPER", hero1: "Turning ideas", hero2: "real stuff.",
    heroDescription: "I'm Ráczempek Lajos, a software developer passionate about building thoughtful digital experiences and turning creative ideas into working solutions.",
    explore: "Explore my work", photo: "BEHIND THE CODE / 2026", motto: "CREATIVE THINKING. PRACTICAL BUILDING.",
    selectedWork: "02 / SELECTED WORK", projectsCount: "02 PROJECTS", projects: "Projects",
    projectsDescription: "A collection of selected work, experiments and applications.", viewProjects: "View projects",
    aboutLabel: "03 / ABOUT", about1: "Curious by nature.", about2: "Developer by choice.",
    aboutDescription1: "I'm a software developer with a background in customer support and a passion for building practical digital experiences.",
    aboutDescription2: "After completing my software development training, I've been expanding my skills through hands-on projects using modern web technologies.",
    readMore: "Read more +", showLess: "Show less −", backgroundLabel: "01 / BACKGROUND",
    backgroundTitle: "People and technology.",
    backgroundText: "My experience in customer support has helped me develop communication, problem-solving and analytical skills. Working with different people and challenges has shaped how I approach technical problems.",
    developmentLabel: "02 / DEVELOPMENT", developmentTitle: "Learning through building.",
    developmentText: "I enjoy understanding how applications work, from frontend interfaces to backend logic. My projects give me the opportunity to explore different technologies and turn ideas into functional solutions.",
    beyondLabel: "03 / BEYOND CODE", beyondTitle: "More than development.",
    beyondText: "Outside programming, I'm interested in sports, photography, music and reading. Playing music and working on creative projects are important parts of my life.",
    contactLabel: "04 / CONTACT", contact1: "Have something", contact2: "in mind",
    contactDescription: "I'm always interested in new challenges, meaningful projects, and opportunities to grow as a developer. Have something in mind? Let's connect.",
    getInTouch: "Get in Touch", footer: "Designed & built with care.",
    connectLabel: "LET'S CONNECT", modalTitle: "Get in touch", modalDescription: "Interested in working together or have a question? Feel free to reach out.",
    closeContact: "Close contact window", openProjects: "Open projects: ChessGame and Pet Medical System",
  },
  hu: {
    menu: "Menü", close: "Bezárás", work: "Projektek", about: "Rólam", contact: "Kapcsolat",
    role: "SZOFTVERFEJLESZTŐ", hero1: "Ötletekből", hero2: "működő megoldások.",
    heroDescription: "Ráczempek Lajos vagyok, szoftverfejlesztő. Szeretek átgondolt digitális megoldásokat készíteni, és a kreatív ötleteket működő alkalmazásokká alakítani.",
    explore: "Projektjeim megtekintése", photo: "A KÓD MÖGÖTT / 2026", motto: "KREATÍV GONDOLKODÁS. GYAKORLATI MEGVALÓSÍTÁS.",
    selectedWork: "02 / KIEMELT MUNKÁK", projectsCount: "02 PROJEKT", projects: "Projektek",
    projectsDescription: "Válogatás a projektjeimből, amelyek során új ötleteket próbáltam ki, és gyakorlati tapasztalatot szereztem.", viewProjects: "Projektek megtekintése",
    aboutLabel: "03 / RÓLAM", about1: "A kíváncsiság hajt.", about2: "A fejlesztést én választottam.",
    aboutDescription1: "Szoftverfejlesztőként olyan alkalmazásokat szeretek készíteni, amelyek valódi problémákra adnak választ. Korábban ügyfélszolgálaton dolgoztam, ahol sokat tanultam a kommunikációról és a problémamegoldásról.",
    aboutDescription2: "A szoftverfejlesztő képzés elvégzése után saját projekteken dolgozom, és folyamatosan bővítem a webfejlesztési ismereteimet.",
    readMore: "Bővebben +", showLess: "Kevesebb −", backgroundLabel: "01 / HÁTTÉR",
    backgroundTitle: "Emberek és technológia.",
    backgroundText: "Az ügyfélszolgálati munkám során megtanultam figyelmesen kérdezni, átlátni az összetett helyzeteket és érthetően kommunikálni. Ezekre a készségekre a fejlesztés során is támaszkodom.",
    developmentLabel: "02 / FEJLESZTÉS", developmentTitle: "Fejlődés gyakorlati projekteken keresztül.",
    developmentText: "Érdekel, hogyan épül fel egy alkalmazás a felhasználói felülettől a háttérrendszerig. A saját projektjeimben új technológiákat próbálhatok ki, és az ötleteimet működő alkalmazásokká alakíthatom.",
    beyondLabel: "03 / A KÓDON TÚL", beyondTitle: "Több mint fejlesztés.",
    beyondText: "Szabadidőmben sportolok, fotózom, olvasok és zenélek. A kreatív tevékenységek a programozáson kívül is fontos szerepet játszanak az életemben.",
    contactLabel: "04 / KAPCSOLAT", contact1: "Van egy ötleted", contact2: "vagy kérdésed",
    contactDescription: "Mindig érdekelnek az új kihívások, az értékes projektek és a fejlődési lehetőségek. Ha van egy ötleted vagy kérdésed, keress bátran!",
    getInTouch: "Kapcsolatfelvétel", footer: "Tervezte és készítette: Ráczempek Lajos.",
    connectLabel: "LÉPJÜNK KAPCSOLATBA", modalTitle: "Írj nekem", modalDescription: "Szívesen dolgoznál velem, vagy kérdésed van? Keress bátran az alábbi elérhetőségeken.",
    closeContact: "Kapcsolati ablak bezárása", openProjects: "Projektek megnyitása: ChessGame és Pet Medical System",
  },
} as const; // Preserve literal types for translation keys and values.

function App() {
  // Access the shared language preference provided by LanguageContext.
  const { language, setLanguage } = useLanguage();
  // Resolve all visible page text from the currently selected language.
  const t = translations[language];

  // Local UI state for expandable content, mobile navigation, and dialogs.
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  // Element references help manage keyboard focus when the contact dialog opens or closes.
  const contactCloseRef = useRef<HTMLButtonElement>(null);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  // Open the project picker and close mobile navigation to avoid overlapping menus.
  const openProjects = () => {
    setProjectsOpen(true);
    setMenuOpen(false);
  };

  const closeProjects = () => {
    setProjectsOpen(false);
  };

  // Apply dialog accessibility behavior only while the contact modal is open.
  useEffect(() => {
    if (!contactOpen) return;

    // Prevent the page behind the modal from scrolling, then focus the close button.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contactCloseRef.current?.focus();

    // Support Escape to close and Tab/Shift+Tab to keep keyboard focus inside the dialog.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
      }

      if (event.key === "Tab") {
        const modal = document.querySelector<HTMLElement>(
          ".contact-modal"
        );

        if (!modal) return;

        // Collect focusable controls in DOM order for a simple focus trap.
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

    // Restore the previous page state and return focus to the trigger on close.
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      contactTriggerRef.current?.focus();
    };
  }, [contactOpen]);

    return (
    <>
      <IntroAnimation />

      {/* Persistent sidebar navigation shared across the portfolio. */}
      <Sidebar />

      {/* Global toolbar and command palette controls. */}
      <Toolbar />

      {/* The projects dialog is controlled by the projectsOpen state. */}
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
            aria-label={language === "hu" ? "Navigáció megnyitása" : "Toggle navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? t.close : t.menu}
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
              {t.work}
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              {t.about}
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              {t.contact}
            </a>
            {/* Switch the language through shared context without reloading the page. */}
            <button
              type="button"
              className="language-switch"
              onClick={() => setLanguage(language === "en" ? "hu" : "en")}
              aria-label={language === "en" ? "Switch to Hungarian" : "Váltás angol nyelvre"}
              title={language === "en" ? "Magyar" : "English"}
            >
              <span aria-hidden="true">{language === "en" ? "🇭🇺" : "🇬🇧"}</span>
              <span>{language === "en" ? "HU" : "EN"}</span>
            </button>
          </nav>
        </header>

        <main>
          {/* Hero section: localized introduction, portrait, and work link. */}
          
<section className="hero hero-redesign" id="home">
  <div className="hero-layout">
    <div className="hero-copy">
      <div className="eyebrow">
        <span className="status-dot" />
        {t.role}
      </div>

      <h1>
        {t.hero1}
        <br />
        <span>{t.hero2}</span>
      </h1>

      <p>
        {t.heroDescription}
      </p>

      <a href="#work" className="hero-work-link">
      {t.explore}
      <span aria-hidden="true">↓</span>
    </a>
    </div>

    <div className="hero-visual">
      <div className="hero-photo-backdrop" />

      <div className="hero-photo-frame">
        <img
          src="/hero-portrait.png"
          alt={language === "hu" ? "Ráczempek Lajos portréja" : "Portrait of Ráczempek Lajos"}
          className="hero-portrait"
        />
      </div>

      <span className="hero-photo-cross" aria-hidden="true">
        +
      </span>
    </div>
  </div>

  <div className="hero-bottom">
    <span>{t.motto}</span>
    <span>01 / 04</span>
  </div>
</section>

          {/* Selected projects: launch the modal instead of navigating away. */}
          <section className="work-section" id="work">
            <Reveal>
              <div className="section-heading">
                <span>{t.selectedWork}</span>
                <span>2026</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <button
                type="button"
                className="projects-launcher"
                onClick={openProjects}
                aria-haspopup="dialog"
                aria-label={t.openProjects}
              >
                <span className="projects-launcher-left">
                  <span className="projects-launcher-label">
                    {t.projectsCount}
                  </span>
                  <span className="projects-launcher-text">
                    <h2>{t.projects}</h2>
                    <p>
                      {t.projectsDescription}
                    </p>
                  </span>
                  <span className="projects-launcher-cta">
                  {t.viewProjects}
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

          {/* About section: reveal additional background details on demand. */}
        <section className="about-section" id="about">
          <Reveal>
            <span className="section-label">
              {t.aboutLabel}
            </span>

            <h2>
              {t.about1}
              <br />
              {t.about2}
            </h2>

            <div className="about-content">
              <p>
                {t.aboutDescription1}
              </p>

              <p>
                {t.aboutDescription2}
              </p>

              <button
                type="button"
                className="about-read-more"
                onClick={() => setAboutExpanded(!aboutExpanded)}
                aria-expanded={aboutExpanded}
                aria-controls="about-extra"
              >
                {aboutExpanded ? t.showLess : t.readMore}
              </button>

              {/* Render extended background details only when requested. */}
              {aboutExpanded && (
                <div
                  id="about-extra"
                  className="about-expanded"
                >
                  <div className="about-extra-item">
                    <span>{t.backgroundLabel}</span>
                    <h3>{t.backgroundTitle}</h3>
                    <p>
                      {t.backgroundText}
                    </p>
                  </div>

                  <div className="about-extra-item">
                    <span>{t.developmentLabel}</span>
                    <h3>{t.developmentTitle}</h3>
                    <p>
                      {t.developmentText}
                    </p>
                  </div>

                  <div className="about-extra-item">
                    <span>{t.beyondLabel}</span>
                    <h3>{t.beyondTitle}</h3>
                    <p>
                      {t.beyondText}
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


          {/* Contact section: open the contact dialog or visit GitHub. */}
          <section
            className="contact-section"
            id="contact"
          >
            <Reveal>
              <span className="section-label">
                {t.contactLabel}
              </span>

              <h2>
                {t.contact1}
                <br />
                {t.contact2}<span>?</span>
              </h2>

              <p>{t.contactDescription}</p>

              <div className="contact-links">
                <button
                  ref={contactTriggerRef}
                  type="button"
                  className="contact-button"
                  onClick={() => setContactOpen(true)}
                >
                  {t.getInTouch}
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
          <span>{t.footer}</span>
        </footer>
      </div>

      {/* Contact modal: accessible dialog with keyboard focus management. */}
      {contactOpen && (
        <div
          className="contact-overlay"
          onMouseDown={(event) => {
            // Close only when clicking the backdrop, not the dialog content.
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
              aria-label={t.closeContact}
            >
              ×
            </button>

            <span className="section-label">
              {t.connectLabel}
            </span>

            <h2 id="contact-modal-title">
              {t.modalTitle}<span>.</span>
            </h2>

            <p>
              {t.modalDescription}
            </p>

            <div className="contact-modal-links" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="mailto:lajos.viktor.raczempek@gmail.com">
                Email — lajos.viktor.raczempek@gmail.com
              </a>
              <a
                href="https://github.com/raczempeklajos"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub — raczempeklajos
              </a>
              <a
                href="https://www.linkedin.com/in/lajos-r%C3%A1czempek-054329397"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn — Lajos Ráczempek
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

