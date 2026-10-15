import ChessPreview from "../components/ChessPreview";
import { Link } from "react-router";
import Reveal from "../components/Reveal";

const features = [
  "Player vs Player and Computer",
  "Move validation and game rules",
  "Game history and undo",
  "Game timers and board customization",
  "Saving and loading games",
];

function ChessGamePage() {
  return (
    <div className="project-page">
      <header className="project-page-header">
        <Link to="/" className="logo">
          lajos<span>.</span>
        </Link>

        <Link to="/#work" className="back-link">
          ← Back to work
        </Link>
      </header>

      <main className="project-page-main">
        {/* Project introduction */}
        <Reveal>
          <section className="project-page-intro">
            <span className="section-label">
              PROJECT 01 / FULL-STACK DEVELOPMENT
            </span>

            <h1>
              ChessGame<span>.</span>
            </h1>

            <p>
              A full-stack chess application built with
              React, TypeScript and ASP.NET Core.
            </p>

            <div className="project-page-links">
            <a
                href="https://chess-game-indol.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Play Chess ↗
            </a>

            <a
                href="https://github.com/raczempeklajos/ChessGame"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub ↗
            </a>
            </div>
          </section>
        </Reveal>

        {/* Project visual preview */}
        <Reveal delay={150}>
        <section className="project-showcase">
            <div className="project-showcase-top">
            <span className="section-label">
                INTERACTIVE PROJECT / 2026
            </span>

            <span className="project-showcase-index">
                01 — 02
            </span>
            </div>

            <div className="project-showcase-content">
            <div className="project-showcase-preview">
                <ChessPreview />
            </div>

            <div className="project-showcase-info">
                <span className="project-showcase-eyebrow">
                THE PROJECT
                </span>

                <h2>
                Every move
                <br />
                matters<span>.</span>
                </h2>

                <p>
                A chess application combining traditional
                game logic with modern web technologies.
                Built with React, TypeScript and .NET.
                </p>

                <div className="project-showcase-tags">
                <span>React</span>
                <span>TypeScript</span>
                <span>ASP.NET Core</span>
                </div>

                <div className="project-showcase-actions">
                <a
                    href="https://chess-game-indol.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-showcase-link"
                >
                    Play Chess ↗
                </a>

                <a
                    href="https://github.com/raczempeklajos/ChessGame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-showcase-link"
                >
                    Explore source code ↗
                </a>
                </div>
            </div>
            </div>
        </section>
        </Reveal>

        {/* Project metadata */}
        <Reveal delay={100}>
          <div className="project-page-divider" />

          <div className="project-page-details">
            <div>
              <span className="detail-label">ROLE</span>
              <p>Full-stack development</p>
            </div>

            <div>
              <span className="detail-label">STACK</span>
              <p>React, TypeScript, C#, .NET, SQLite</p>
            </div>

            <div>
              <span className="detail-label">TYPE</span>
              <p>Personal project</p>
            </div>
          </div>
        </Reveal>

        {/* Project overview */}
        <Reveal>
          <section className="project-page-description">
            <span className="section-label">
              01 / OVERVIEW
            </span>

            <h2>Chess, built from scratch.</h2>

            <p>
              ChessGame is a personal software development
              project focused on implementing chess logic,
              building a responsive user interface and
              connecting a React frontend to a .NET backend.
            </p>

            <p>
              The application includes player-versus-player
              and computer game modes, move validation,
              game history, timers and persistent game data.
            </p>
          </section>
        </Reveal>

        {/* Project features */}
        <section className="project-page-description">
          <Reveal>
            <span className="section-label">
              02 / FEATURES
            </span>

            <h2>What it does.</h2>
          </Reveal>

          <div className="feature-list">
            {features.map((feature, index) => (
              <Reveal key={feature} delay={index * 60}>
                <div className="feature-row">
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{feature}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Bottom navigation */}
        <Reveal>
          <div className="project-page-bottom">
            <Link to="/">← Back to portfolio</Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

export default ChessGamePage;
