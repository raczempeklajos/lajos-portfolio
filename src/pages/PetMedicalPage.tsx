import { Link } from "react-router";
import Reveal from "../components/Reveal";
import { useLanguage } from "../LanguageContext";

const features = {
  en: [
    "User registration and authentication",
    "Pet profile management",
    "Appointment requests and approval",
    "Vaccination records",
    "Medical history and prescriptions",
    "Role-based access",
  ],
  hu: [
    "Regisztráció és bejelentkezés",
    "Háziállatok adatainak kezelése",
    "Időpontkérés és az időpontok jóváhagyása",
    "Oltási adatok nyilvántartása",
    "Kórelőzmények és receptek kezelése",
    "Jogosultságok kezelése felhasználói szerepkörök alapján",
  ],
};

function PetMedicalPage() {
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
            <span className="section-label">{hu ? "02. PROJEKT / FULL-STACK FEJLESZTÉS" : "PROJECT 02 / FULL-STACK DEVELOPMENT"}</span>
            <h1>Pet Medical System<span>.</span></h1>
            <p>{hu ? "Állatorvosi ügyintézést támogató webalkalmazás, amely megkönnyíti a háziállatok adatainak kezelését, az időpontfoglalást, valamint a gazdik és az adminisztrátorok közötti kapcsolattartást." : "A veterinary management application designed to simplify pet records, appointments and communication between pet owners and administrators."}</p>
          </section>
        </Reveal>
        <Reveal delay={100}>
          <div className="project-page-divider" />
          <div className="project-page-details">
            <div><span className="detail-label">{hu ? "SZEREPKÖR" : "ROLE"}</span><p>{hu ? "Full-stack fejlesztés" : "Full-stack development"}</p></div>
            <div><span className="detail-label">STACK</span><p>React, JavaScript, Python, Django REST</p></div>
            <div><span className="detail-label">{hu ? "TÍPUS" : "TYPE"}</span><p>{hu ? "Képzési záróprojekt" : "Final course project"}</p></div>
          </div>
        </Reveal>
        <Reveal>
          <section className="project-page-description">
            <span className="section-label">{hu ? "01 / ÁTTEKINTÉS" : "01 / OVERVIEW"}</span>
            <h2>{hu ? "Egyszerűbb állatorvosi ügyintézés." : "Making pet care easier."}</h2>
            <p>{hu ? "A Pet Medical System egy full-stack webalkalmazás, amelyet a szoftverfejlesztő képzésem záróprojektjeként készítettem." : "Pet Medical System is a full-stack web application developed as a final software development course project."}</p>
            <p>{hu ? "A felületen a gazdik nyilvántarthatják háziállataikat, állatorvosi időpontot kérhetnek, és egy helyen érhetik el a fontos egészségügyi adatokat." : "The platform allows pet owners to manage their pets, request veterinary appointments and access important medical information through a centralized interface."}</p>
            <p>{hu ? "Az adminisztrátorok elbírálhatják az időpontkérelmeket, és kezelhetik a kapcsolódó nyilvántartásokat." : "Administrators can review appointment requests and manage the related records through the application."}</p>
          </section>
        </Reveal>
        <section className="project-page-description">
          <Reveal><span className="section-label">{hu ? "02 / FUNKCIÓK" : "02 / FEATURES"}</span><h2>{hu ? "Főbb funkciók." : "What it does."}</h2></Reveal>
          <div className="feature-list">{features[language].map((feature, index) => (
            <Reveal key={index} delay={index * 60}><div className="feature-row"><span>{String(index + 1).padStart(2, "0")}</span><p>{feature}</p></div></Reveal>
          ))}</div>
        </section>
        <Reveal><div className="project-page-bottom"><Link to="/#work">← {hu ? "Vissza a portfólióhoz" : "Back to portfolio"}</Link></div></Reveal>
      </main>
    </div>
  );
}

export default PetMedicalPage;
