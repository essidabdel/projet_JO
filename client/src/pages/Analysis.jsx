import { IoStatsChart, IoBulb, IoGrid, IoTimer, IoTrophy, IoGlobe, IoAnalytics } from "react-icons/io5";
import "./analysis.css";
import image1 from "../assets/images/1.png";
import image2 from "../assets/images/2.png";
import image3 from "../assets/images/3.png";
import image4 from "../assets/images/4.png";
import image5 from "../assets/images/5.png";
import image6 from "../assets/images/6.png";

export default function Analysis() {
  return (
    <div className="analysisPage">
      <header className="analysisHeader">
        <h1 className="analysisTitle">
          <IoStatsChart className="analysisTitleIcon" />
          Analyses & Statistiques
        </h1>
        <p className="analysisSubtitle">
          Explorez les données olympiques à travers des visualisations avancées et découvrez comment l'IA prédit les performances
        </p>
      </header>

      {/* Section 1 */}
      <section className="analysisSection">
        <div className="sectionHeader">
          <div className="sectionNumber">1</div>
          <div className="sectionTitleGroup">
            <h2 className="sectionTitle">
              <IoBulb className="sectionIcon" />
              L'Importance des Variables
            </h2>
            <p className="sectionSubtitle">Le "Cerveau" de l'IA</p>
          </div>
        </div>
        <div className="sectionContent">
          <div className="textBlock">
            <p className="highlightText">Ce graphique en barres horizontales classe les informations par ordre d'utilité pour le modèle.</p>
            <p><strong>Ce qu'il raconte :</strong> Il révèle quels critères l'IA privilégie pour attribuer une médaille. Si <code>athlete_prev_medals</code> ou <code>country_sport_score</code> dominent, cela prouve que le modèle s'appuie sur la méritocratie et la hiérarchie mondiale plutôt que sur le hasard.</p>
            <div className="infoBox">
              <span className="infoLabel">💡 Info clé :</span>
              <p>Plus une barre est longue, plus cette variable a été déterminante lors des milliers de "tests" effectués par l'IA durant son entraînement.</p>
            </div>
          </div>
          <div className="imageBlock">
            <img src={image1} alt="Importance des variables" className="analysisImage" />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="analysisSection">
        <div className="sectionHeader">
          <div className="sectionNumber">2</div>
          <div className="sectionTitleGroup">
            <h2 className="sectionTitle">
              <IoGrid className="sectionIcon" />
              La Matrice de Corrélation
            </h2>
            <p className="sectionSubtitle">Les Liens Invisibles</p>
          </div>
        </div>
        <div className="sectionContent reverse">
          <div className="imageBlock">
            <img src={image2} alt="Matrice de corrélation" className="analysisImage" />
          </div>
          <div className="textBlock">
            <p className="highlightText">C'est une carte thermique (Heatmap) qui mesure la force de la relation entre deux variables.</p>
            <p><strong>Ce qu'il raconte :</strong> Elle montre si deux données évoluent dans le même sens. Par exemple, si le carré entre <code>target</code> et <code>is_host</code> est d'un rouge léger, cela confirme mathématiquement que jouer à domicile augmente statistiquement les chances de médaille.</p>
            <div className="infoBox">
              <span className="infoLabel">💡 Info clé :</span>
              <p>Un score de <span className="mathFormula">1.0</span> (rouge foncé) signifie une relation parfaite. Un score proche de <span className="mathFormula">0</span> (couleur pâle) signifie que les deux variables n'ont aucun lien entre elles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="analysisSection">
        <div className="sectionHeader">
          <div className="sectionNumber">3</div>
          <div className="sectionTitleGroup">
            <h2 className="sectionTitle">
              <IoTimer className="sectionIcon" />
              La Distribution de l'Âge
            </h2>
            <p className="sectionSubtitle">L'Horloge Biologique</p>
          </div>
        </div>
        <div className="sectionContent">
          <div className="textBlock">
            <p className="highlightText">Le Boxplot (boîte à moustaches) segmente les athlètes par type de résultat.</p>
            <p><strong>Ce qu'il raconte :</strong> Il montre la fenêtre de tir idéale pour gagner. On remarque généralement que les boîtes des médaillés (1, 2, 3) sont plus compactes et situées plus bas que la boîte des perdants (0).</p>
            <div className="infoBox">
              <span className="infoLabel">💡 Info clé :</span>
              <p>La ligne au milieu de la boîte est la médiane. Si elle est à 25 ans pour l'Or, cela signifie que 50 % des champions olympiques ont moins de 25 ans et 50 % ont plus. Les points isolés en haut sont des "exceptions" (ex: un cavalier de 60 ans).</p>
            </div>
          </div>
          <div className="imageBlock">
            <img src={image3} alt="Distribution de l'âge" className="analysisImage" />
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="analysisSection">
        <div className="sectionHeader">
          <div className="sectionNumber">4</div>
          <div className="sectionTitleGroup">
            <h2 className="sectionTitle">
              <IoTrophy className="sectionIcon" />
              L'Impact de l'Expérience
            </h2>
            <p className="sectionSubtitle">Le Poids des Années</p>
          </div>
        </div>
        <div className="sectionContent reverse">
          <div className="imageBlock">
            <img src={image4} alt="Impact de l'expérience" className="analysisImage" />
          </div>
          <div className="textBlock">
            <p className="highlightText">Ce graphique compare le nombre de participations (games_participations) avec le succès.</p>
            <p><strong>Ce qu'il raconte :</strong> Il valide l'adage "C'est en forgeant qu'on devient forgeron". Si la boîte de l'Or est plus haute que celle des perdants, l'IA nous confirme qu'un athlète qui en est à ses 3èmes JO a une probabilité de victoire bien plus élevée qu'un débutant.</p>
            <div className="infoBox">
              <span className="infoLabel">💡 Info clé :</span>
              <p>On observe souvent un "effet d'escalier" : plus on monte en gamme de médaille, plus le nombre de participations passées est élevé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="analysisSection">
        <div className="sectionHeader">
          <div className="sectionNumber">5</div>
          <div className="sectionTitleGroup">
            <h2 className="sectionTitle">
              <IoGlobe className="sectionIcon" />
              La Dominance par Pays
            </h2>
            <p className="sectionSubtitle">La Culture de la Gagne</p>
          </div>
        </div>
        <div className="sectionContent">
          <div className="textBlock">
            <p className="highlightText">Le Violin Plot montre la densité du score historique du pays (country_sport_score).</p>
            <p><strong>Ce qu'il raconte :</strong> La forme du "violon" montre où se situe la majorité des gens. Pour la médaille d'Or, le violon est souvent "gonflé" vers le haut. Cela signifie qu'il est très difficile de gagner l'Or si l'on ne vient pas d'une nation qui a déjà une structure solide et un historique de victoires dans ce sport.</p>
            <div className="infoBox">
              <span className="infoLabel">💡 Info clé :</span>
              <p>La largeur de la forme indique le volume d'athlètes. Un violon très fin en haut signifie que l'élite est très restreinte.</p>
            </div>
          </div>
          <div className="imageBlock">
            <img src={image5} alt="Dominance par pays" className="analysisImage" />
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="analysisSection">
        <div className="sectionHeader">
          <div className="sectionNumber">6</div>
          <div className="sectionTitleGroup">
            <h2 className="sectionTitle">
              <IoAnalytics className="sectionIcon" />
              La Zone des Champions
            </h2>
            <p className="sectionSubtitle">Le Nuage de Performance</p>
          </div>
        </div>
        <div className="sectionContent reverse">
          <div className="imageBlock">
            <img src={image6} alt="Zone des champions" className="analysisImage" />
          </div>
          <div className="textBlock">
            <p className="highlightText">Le Scatter Plot croise l'âge et l'expérience en colorant les points par médaille.</p>
            <p><strong>Ce qu'il raconte :</strong> C'est une vue d'ensemble. On y voit souvent un "amas" de points colorés dans une zone précise (ex: entre 24 et 28 ans, avec 2 participations). C'est le <strong>Sommet de la Carrière</strong>. En dehors de ce nuage, les points sont plus rares et souvent de couleur "0" (perdu).</p>
            <div className="infoBox">
              <span className="infoLabel">💡 Info clé :</span>
              <p>Ce graphique permet de repérer les "ovnis" sportifs : ceux qui gagnent très jeunes ou très vieux, car ils apparaissent isolés loin du groupe principal.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="ctaCard">
        <h3>🎯 Conclusion</h3>
        <p>
          Ces visualisations démontrent que notre modèle d'IA ne se base pas sur le hasard, mais sur des patterns statistiques solides. 
          L'âge optimal, l'expérience passée, et la force historique du pays dans un sport sont les trois piliers principaux de la prédiction.
        </p>
      </div>
    </div>
  );
}
