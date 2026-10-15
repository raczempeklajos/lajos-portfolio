
import { Link } from "react-router";
import Reveal from "../components/Reveal";

const features = [
  "User registration and authentication",
  "Pet profile management",
  "Appointment requests and approval",
  "Vaccination records",
  "Medical history and prescriptions",
  "Role-based access",
];

function PetMedicalPage() {
  return (
    <div className="project-page">
      {/* Navigation */}
      <header className="project-page-header">
        <Link to="/" className="logo">
          lajos<span>.</span>
        </Link>

        <Link to="/#work" className="back-link">
          ← Back to work
        </Link>
      </header>

      <main className="project-page-main">
        {/* Introduction */}
        <Reveal>
          <section className="project-page-intro">
            <span className="section-label">
              PROJECT 02 / FULL-STACK DEVELOPMENT
            </span>

            <h1>
              Pet Medical System<span>.</span>
            </h1>

            <p>
              A veterinary management application
              designed to simplify pet records,
              appointments and communication
              between pet owners and administrators.
            </p>
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
              <p>React, JavaScript, Python, Django REST</p>
            </div>

            <div>
              <span className="detail-label">TYPE</span>
              <p>Final course project</p>
            </div>
          </div>
        </Reveal>

        {/* Overview */}
        <Reveal>
          <section className="project-page-description">
            <span className="section-label">
              01 / OVERVIEW
            </span>

            <h2>Making pet care easier.</h2>

            <p>
              Pet Medical System is a full-stack web
              application developed as a final software
              development course project.
            </p>

            <p>
              The platform allows pet owners to manage
              their pets, request veterinary appointments
              and access important medical information
              through a centralized interface.
            </p>

            <p>
              Administrators can review appointment
              requests and manage the related records
              through the application.
            </p>
          </section>
        </Reveal>

        {/* Features */}
        <section className="project-page-description">
          <Reveal>
            <span className="section-label">
              02 / FEATURES
            </span>

            <h2>What it does.</h2>
          </Reveal>

          <div className="feature-list">
            {features.map((feature, index) => (
              <Reveal
                key={feature}
                delay={index * 60}
              >
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
            <Link to="/#work">
              ← Back to portfolio
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

export default PetMedicalPage;
