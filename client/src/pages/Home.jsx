import { Link } from "react-router-dom";
import { IoArrowForward, IoTrophy, IoInformationCircle, IoStatsChart, IoRocket, IoSparkles } from "react-icons/io5";
import tourImage from "../assets/images/tour.png";
import tour1Image from "../assets/images/tour1.jpg";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="heroContent">
          <div className="heroText">
            <div className="heroBadge">
              <IoSparkles className="badgeIcon" />
              Paris 2024 • AI Predictions
            </div>
            <h1 className="heroTitle">
              🏅 Olympics Analytics & Predictions
            </h1>
            <p className="heroDescription">
              Découvrez les prédictions basées sur l'IA pour les Jeux Olympiques de Paris 2024. 
              Visualisez les pays en tête du classement et les sports prometteurs par nation.
            </p>

            <div className="heroActions">
              <Link className="btnPrimary" to="/predictions">
                <IoTrophy />
                Voir les Prédictions
                <IoArrowForward />
              </Link>
              <Link className="btnGhost" to="/about">
                <IoInformationCircle />
                À propos du projet
              </Link>
            </div>
          </div>

          <div className="heroImage">
            <img src={tourImage} alt="Tour Eiffel - JO Paris 2024" className="tourImage" />
          </div>
        </div>
      </section>

      <section className="grid">
        <Link to="/predictions" className="cardLink">
          <div className="card cardPrimary">
            <div className="cardIcon">🥇</div>
            <div className="cardKicker">Interactive</div>
            <div className="cardTitle">Prédictions</div>
            <div className="cardText">
              Top 10 des pays (médailles totaux) + podium des 3 meilleurs sports par pays
            </div>
            <div className="cardArrow">→</div>
          </div>
        </Link>

        <Link to="/analysis" className="cardLink">
          <div className="card cardSecondary">
            <div className="cardIcon">📊</div>
            <div className="cardKicker">Analytics</div>
            <div className="cardTitle">Analyses</div>
            <div className="cardText">
              Visualisations avancées et analyses statistiques des données olympiques
            </div>
            <div className="cardArrow">→</div>
          </div>
        </Link>

        <Link to="/about" className="cardLink">
          <div className="card cardTertiary">
            <div className="cardIcon">ℹ️</div>
            <div className="cardKicker">Informations</div>
            <div className="cardTitle">À propos</div>
            <div className="cardText">
              Stack technique, API, base de données PostgreSQL et détails du projet
            </div>
            <div className="cardArrow">→</div>
          </div>
        </Link>
      </section>

      <section className="olympicImageSection">
        <img src={tour1Image} alt="Jeux Olympiques Paris 2024" className="olympicImage" />
      </section>

      <section className="features">
        <h2 className="featuresTitle">
          <IoRocket className="titleIcon" />
          Fonctionnalités
        </h2>
        <div className="featuresGrid">
          <div className="featureItem">
            <div className="featureIcon">🤖</div>
            <h3>Prédictions IA</h3>
            <p>Algorithmes avancés pour prédire les performances des pays</p>
          </div>
          <div className="featureItem">
            <div className="featureIcon">📈</div>
            <h3>Visualisations</h3>
            <p>Graphiques interactifs avec Plotly pour explorer les données</p>
          </div>
          
          <div className="featureItem">
            <div className="featureIcon">🎯</div>
            <h3>Précision</h3>
            <p>Analyse basée sur les données historiques et tendances</p>
          </div>
        </div>
      </section>

      <section className="teamSection">
        <h2 className="teamTitle">👥 Notre Équipe</h2>
        <p className="teamSubtitle">Les talents derrière ce projet</p>
        <div className="teamGrid">
          <div className="teamMember">
            <div className="memberAvatar">
              <span className="avatarText">YB</span>
            </div>
            <h3 className="memberName">Yannis BOUTTIER</h3>
          </div>
          <div className="teamMember">
            <div className="memberAvatar">
              <span className="avatarText">DC</span>
            </div>
            <h3 className="memberName">Duncan COSTES</h3>
          </div>
          <div className="teamMember">
            <div className="memberAvatar">
              <span className="avatarText">AB</span>
            </div>
            <h3 className="memberName">Anya BENABDERRAHMANE</h3>
          </div>
          <div className="teamMember">
            <div className="memberAvatar">
              <span className="avatarText">BT</span>
            </div>
            <h3 className="memberName">Brawn Dunel TEBOH</h3>
          </div>
          <div className="teamMember">
            <div className="memberAvatar">
              <span className="avatarText">AE</span>
            </div>
            <h3 className="memberName">Abdellatif ESSID</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
