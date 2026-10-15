import ChessPreview from "../components/ChessPreview";
import { Link } from "react-router";
import Reveal from "../components/Reveal";
import { useLanguage } from "../LanguageContext";

const features = {
  en: [
    "Player vs Player and Computer",
    "Move validation and game rules",
    "Game history and undo",
    "Game timers and board customization",
    "Saving and loading games",
  ],
  hu: [
    "Játék két játékos között vagy a számítógép ellen",
    "Lépésellenőrzés és a sakkszabályok kezelése",
    "Lépéselőzmények és lépések visszavonása",
    "Játékidő mérése és a sakktábla testreszabása",
    "Játszmák mentése és betöltése",
  ],
};

function ChessGamePage() {
  const { language } = useLanguage();
  const hu = language === "hu";
  return (
    <div className="project-page">
      <header className="project-page-header">
        <Link to="/" className="logo">lajos<span>.</span></Link>
        <Link to="/#work" className="back-link">← {hu ? "Vissza a projektekhez" : "Back to work"}</Link>
      </header>
      <main className="project-page-main">
        <Reveal>
          <section className="project-page-intro">
            <span className="section-label">{hu ? "01. PROJEKT / FULL-STACK FEJLESZTÉS" : "PROJECT 01 / FULL-STACK DEVELOPMENT"}</span>
            <h1>ChessGame<span>.</span></h1>
            <p>{hu ? "React, TypeScript és ASP.NET Core technológiákkal készült full-stack sakkalkalmazás." : "A full-stack chess application built with React, TypeScript and ASP.NET Core."}</p>
            <div className="project-page-links">
              <a href="https://chess-game-indol.vercel.app" target="_blank" rel="noopener noreferrer">{hu ? "Sakk indítása" : "Play Chess"}</a>
              <a href="https://github.com/raczempeklajos/ChessGame" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </section>
        </Reveal>
        <Reveal delay={150}>
          <section className="project-showcase">
            <div className="project-showcase-top">
              <span className="section-label">{hu ? "INTERAKTÍV PROJEKT / 2026" : "INTERACTIVE PROJECT / 2026"}</span>
              <span className="project-showcase-index">01 — 02</span>
            </div>
            <div className="project-showcase-content">
              <div className="project-showcase-preview"><ChessPreview /></div>
              <div className="project-showcase-info">
                <span className="project-showcase-eyebrow">{hu ? "A PROJEKTRŐL" : "THE PROJECT"}</span>
                <h2>{hu ? <>Minden lépés<br />számít<span>.</span></> : <>Every move<br />matters<span>.</span></>}</h2>
                <p>{hu ? "A klasszikus sakk szabályait modern webes technológiákkal ötvöző alkalmazás, React, TypeScript és .NET használatával." : "A chess application combining traditional game logic with modern web technologies. Built with React, TypeScript and .NET."}</p>
                <div className="project-showcase-tags"><span>React</span><span>TypeScript</span><span>ASP.NET Core</span></div>
                <div className="project-showcase-actions">
                  <a href="https://chess-game-indol.vercel.app" target="_blank" rel="noopener noreferrer" className="project-showcase-link">{hu ? "Sakk indítása" : "Play Chess"}</a>
                  <a href="https://github.com/raczempeklajos/ChessGame" target="_blank" rel="noopener noreferrer" className="project-showcase-link">{hu ? "Forráskód megtekintése" : "Explore source code"}</a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
        <Reveal delay={100}>
          <div className="project-page-divider" />
          <div className="project-page-details">
            <div><span className="detail-label">{hu ? "SZEREPKÖR" : "ROLE"}</span><p>{hu ? "Full-stack fejlesztés" : "Full-stack development"}</p></div>
            <div><span className="detail-label">STACK</span><p>React, TypeScript, C#, .NET, SQLite</p></div>
            <div><span className="detail-label">{hu ? "TÍPUS" : "TYPE"}</span><p>{hu ? "Saját projekt" : "Personal project"}</p></div>
          </div>
        </Reveal>
        <Reveal>
          <section className="project-page-description">
            <span className="section-label">{hu ? "01 / ÁTTEKINTÉS" : "01 / OVERVIEW"}</span>
            <h2>{hu ? "Sakkalkalmazás az alapoktól." : "Chess, built from scratch."}</h2>
            <p>{hu ? "A ChessGame egy saját fejlesztésű alkalmazás, amelyben a sakk játékszabályainak megvalósítására, a reszponzív felület kialakítására, valamint a React frontend és a .NET backend összekapcsolására helyeztem a hangsúlyt." : "ChessGame is a personal software development project focused on implementing chess logic, building a responsive user interface and connecting a React frontend to a .NET backend."}</p>
            <p>{hu ? "Az alkalmazásban két játékos egymás ellen vagy a számítógép ellen is játszhat. A funkciók közé tartozik a lépések ellenőrzése, a játszmaelőtörténet, az időmérés és a játékállás mentése." : "The application includes player-versus-player and computer game modes, move validation, game history, timers and persistent game data."}</p>
          </section>
        </Reveal>
        <section className="project-page-description">
          <Reveal><span className="section-label">{hu ? "02 / FUNKCIÓK" : "02 / FEATURES"}</span><h2>{hu ? "Főbb funkciók." : "What it does."}</h2></Reveal>
          <div className="feature-list">{features[language].map((feature, index) => (
            <Reveal key={index} delay={index * 60}><div className="feature-row"><span>{String(index + 1).padStart(2, "0")}</span><p>{feature}</p></div></Reveal>
          ))}</div>
        </section>
        <Reveal><div className="project-page-bottom"><Link to="/">← {hu ? "Vissza a portfólióhoz" : "Back to portfolio"}</Link></div></Reveal>
      </main>
    </div>
  );
}

export default ChessGamePage;
