import { IoCodeSlash, IoServer, IoLogoReact, IoCloud, IoGitBranch } from "react-icons/io5";
import "./about.css";
import tour2Image from "../assets/images/tour2.jpg";

export default function About() {
  return (
    <div className="aboutPage">
      <header className="aboutHeader">
        <h1 className="aboutTitle">
          <span className="aboutIcon">ℹ️</span>
          À propos du Projet
        </h1>
        <p className="aboutSubtitle">
          Plateforme de visualisation et prédictions pour les Jeux Olympiques de Paris 2024
        </p>
      </header>

      <section className="projectOverview">
        <div className="overviewCard">
          <div className="overviewIcon">🎯</div>
          <h3>Objectif</h3>
          <p>
            Application web moderne pour visualiser et analyser les prédictions des performances 
            des pays participants aux JO 2024, basées sur des algorithmes d'intelligence artificielle 
            et l'analyse de données historiques.
          </p>
        </div>
      </section>

      <section className="aboutImageSection">
        <img src={tour2Image} alt="Jeux Olympiques" className="aboutImage" />
      </section>

      <div className="sectionsGrid">
        <section className="aboutSection">
          <h2 className="sectionTitle">
            <IoCodeSlash className="sectionIcon" />
            Stack Technique
          </h2>
          <div className="techStack">
            <div className="techItem">
              <IoLogoReact className="techIcon reactIcon" />
              <div>
                <strong>Frontend</strong>
                <p>React 18 + Vite + React Router</p>
              </div>
            </div>
            <div className="techItem">
              <IoServer className="techIcon nodeIcon" />
              <div>
                <strong>Backend</strong>
                <p>Node.js + Express.js</p>
              </div>
            </div>
            <div className="techItem">
              <IoServer className="techIcon dbIcon" />
              <div>
                <strong>Base de données</strong>
                <p>PostgreSQL </p>
              </div>
            </div>
            <div className="techItem">
              <IoCloud className="techIcon chartIcon" />
              <div>
                <strong>Visualisations</strong>
                <p>Plotly.js (react-plotly.js)</p>
              </div>
            </div>
          </div>
        </section>

        

        

        <section className="aboutSection">
          <h2 className="sectionTitle">
            <IoGitBranch className="sectionIcon" />
            Fonctionnalités
          </h2>
          <div className="featuresList">
            <div className="featureCard">
              <span className="featureBadge">✅</span>
              <div>
                <strong>Prédictions interactives</strong>
                <p>Sélection dynamique des pays et visualisation des résultats</p>
              </div>
            </div>
            
            <div className="featureCard">
              <span className="featureBadge">✅</span>
              <div>
                <strong>Top 10 des pays</strong>
                <p>Classement mondial basé sur les points totaux</p>
              </div>
            </div>
            <div className="featureCard">
              <span className="featureBadge">🚧</span>
              <div>
                <strong>Analyses historiques</strong>
                <p>Comparaisons et tendances (à venir)</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="aboutFooter">
        <div className="footerBadge">
          <span>🚀</span>
          Projet développé avec passion • 2026
        </div>
      </footer>
    </div>
  );
}
