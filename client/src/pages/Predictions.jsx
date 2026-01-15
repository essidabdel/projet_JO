import { useEffect, useMemo, useState } from "react";
import Plot from "react-plotly.js";
import { IoTrophy, IoEarth, IoAlert, IoTrendingUp, IoMedal, IoBarChart, IoAnalytics, IoPeople, IoHome, IoRibbon, IoFlash, IoRocket } from "react-icons/io5";
import "./predictions.css";

export default function Predictions() {
  const [activeTab, setActiveTab] = useState("global"); // "global" ou "detailed"
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("");
  const [row, setRow] = useState(null);

  const [topCountries, setTopCountries] = useState([]);
  const [loadingTop, setLoadingTop] = useState(false);

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingRow, setLoadingRow] = useState(false);
  const [error, setError] = useState("");

  // Load countries list
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError("");
        setLoadingCountries(true);

        const res = await fetch("/api/countries");
        if (!res.ok) throw new Error("Cannot load countries");
        const data = await res.json();

        if (cancelled) return;
        setCountries(data);
        setSelected((prev) => prev || data?.[0] || "");
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoadingCountries(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load country details
  useEffect(() => {
    if (!selected) return;

    let cancelled = false;

    (async () => {
      try {
        setError("");
        setLoadingRow(true);

        const res = await fetch(`/api/countries/${encodeURIComponent(selected)}`);
        if (!res.ok) throw new Error("Cannot load country details");
        const data = await res.json();

        if (cancelled) return;
        setRow(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoadingRow(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selected]);

  // Load top countries chart
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoadingTop(true);

        const res = await fetch("/api/top-countries?limit=10");
        if (!res.ok) throw new Error("Cannot load top countries");
        const data = await res.json();

        if (cancelled) return;
        setTopCountries(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoadingTop(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const podium = useMemo(() => {
    if (!row) return [];
    return [
      { rank: 1, sport: row.sport_1, points: Number(row.points_1) },
      { rank: 2, sport: row.sport_2, points: Number(row.points_2) },
      { rank: 3, sport: row.sport_3, points: Number(row.points_3) },
    ].filter((x) => x.sport);
  }, [row]);

  return (
    <div className="predictionsPage">
      <header className="pageHeader">
        <h1 className="pageTitle">
          <IoTrophy className="pageTitleIcon" />
          Prédictions JO 2024
        </h1>
        <p className="pageSubtitle">
          Découvrez les prédictions du nombre de médailles par pays et par sport
        </p>
      </header>

      {/* TABS NAVIGATION */}
      <div className="tabsContainer">
        <button 
          className={`tabButton ${activeTab === "global" ? "active" : ""}`}
          onClick={() => setActiveTab("global")}
        >
          <IoBarChart />
          <span>Prédictions Globales</span>
        </button>
        <button 
          className={`tabButton ${activeTab === "detailed" ? "active" : ""}`}
          onClick={() => setActiveTab("detailed")}
        >
          <IoAnalytics />
          <span>Prédictions Détaillées</span>
        </button>
      </div>

      {error && (
        <div className="errorBox">
          <IoAlert className="errorIcon" />
          <span>{error}</span>
        </div>
      )}

      {/* GLOBAL TAB CONTENT */}
      {activeTab === "global" && (
        <>
          {/* TOP 10 COUNTRIES - SECTION PRINCIPALE */}
          <section className="topCountriesSection">
        <div className="topCountriesHeader">
          <div className="topCountriesTitle">
            <IoTrendingUp className="topCountriesIcon" />
            <div>
              <h2>🏆 Top 10 Mondial</h2>
              <p>Classement des pays par nombre total de médailles prévues</p>
            </div>
          </div>
        </div>

        {loadingTop ? (
          <div className="loadingState">
            <div className="spinner"></div>
            <p>Chargement du classement mondial...</p>
          </div>
        ) : (
          <div className="topCountriesContent">
            <div className="chartWrapperLarge">
              <Plot
                data={[
                  {
                    type: "bar",
                    x: topCountries.map((d) => d.country),
                    y: topCountries.map((d) => Number(d.total_points)),
                    text: topCountries.map((d) => `${Number(d.total_points).toFixed(0)} 🏅`),
                    textposition: "outside",
                    hovertemplate: "<b>%{x}</b><br>Médailles prévues: %{y:.0f}<extra></extra>",
                    marker: {
                      color: topCountries.map((_, i) => 
                        i === 0 ? '#ffd700' : 
                        i === 1 ? '#c0c0c0' : 
                        i === 2 ? '#cd7f32' : 
                        i < 5 ? '#8b5cf6' :
                        '#6366f1'
                      ),
                      line: {
                        color: 'rgba(255,255,255,0.3)',
                        width: 2
                      }
                    }
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { l: 60, r: 40, t: 30, b: 120 },
                  xaxis: { 
                    tickangle: -45,
                    color: '#e8ecff',
                    tickfont: { size: 13, family: 'Inter, sans-serif' },
                    showgrid: false
                  },
                  yaxis: {
                    title: {
                      text: "Nombre de médailles",
                      font: { size: 14, color: '#e8ecff' }
                    },
                    color: '#e8ecff',
                    gridcolor: 'rgba(255,255,255,0.08)',
                    tickfont: { size: 13 }
                  },
                  paper_bgcolor: 'transparent',
                  plot_bgcolor: 'transparent',
                  font: {
                    color: '#e8ecff',
                    size: 13,
                    family: 'Inter, sans-serif'
                  },
                  showlegend: false
                }}
                style={{ width: "100%", height: 480 }}
                useResizeHandler
                config={{ displayModeBar: false }}
              />
            </div>

            <div className="topCountriesRanking">
              {topCountries.map((country, idx) => (
                <div key={country.country} className={`rankingItem rank-${idx + 1}`}>
                  <div className="rankingPosition">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </div>
                  <div className="rankingCountry">{country.country}</div>
                  <div className="rankingMedals">
                    <span className="medalCount">{Number(country.total_points).toFixed(0)}</span>
                    <span className="medalLabel">médailles</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* COUNTRY DETAILS - SECTION SECONDAIRE */}
      <section className="countryDetailsSection">
        <div className="countryDetailsHeader">
          <IoEarth className="countryDetailsIcon" />
          <div>
            <h2>🔍 Détails par Pays</h2>
            <p>Explorez les 3 sports les plus prometteurs pour chaque pays</p>
          </div>
        </div>

        <div className="countrySelector">
          <label htmlFor="country-select" className="selectorLabel">
            Sélectionnez un pays :
          </label>
          {loadingCountries ? (
            <div className="loadingStateSmall">
              <div className="spinnerSmall"></div>
              <span>Chargement...</span>
            </div>
          ) : (
            <select
              id="country-select"
              className="selectLarge"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>

        {loadingRow ? (
          <div className="loadingState">
            <div className="spinner"></div>
            <p>Chargement des données du pays...</p>
          </div>
        ) : (
          <>
            <div className="selectedCountryBanner">
              <div className="bannerFlag">🏴</div>
              <div className="bannerInfo">
                <h3>{selected}</h3>
                <p>Top 3 des sports les plus prometteurs</p>
              </div>
            </div>

            <div className="podiumGrid">
              {podium.map((p, idx) => (
                <div className={`podiumCardLarge rank${p.rank}`} key={p.rank}>
                  <div className="podiumBadge">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                    <span className="podiumRankLabel">Position {p.rank}</span>
                  </div>
                  <div className="podiumSportLarge">{p.sport}</div>
                  <div className="podiumMedals">
                    <span className="medalNumber">{Number.isFinite(p.points) ? Math.round(p.points) : "—"}</span>
                    <span className="medalText">médailles prévues</span>
                  </div>
                </div>
              ))}

              {!podium.length && (
                <div className="noDataLarge">
                  <span className="noDataIcon">📭</span>
                  <h4>Aucune donnée disponible</h4>
                  <p>Ce pays ne possède pas de prédictions pour le moment</p>
                </div>
              )}
            </div>

            {podium.length > 0 && (
              <div className="chartWrapperLarge" style={{ marginTop: '32px' }}>
                <Plot
                  data={[
                    {
                      type: "bar",
                      orientation: "h",
                      y: podium.map((p) => p.sport).reverse(),
                      x: podium.map((p) => p.points).reverse(),
                      text: podium.map((p) => `${p.points} 🏅`).reverse(),
                      textposition: "outside",
                      hovertemplate: "<b>%{y}</b><br>Médailles: %{x}<extra></extra>",
                      marker: {
                        color: ['#cd7f32', '#c0c0c0', '#ffd700'],
                        line: {
                          color: 'rgba(255,255,255,0.3)',
                          width: 2
                        }
                      }
                    },
                  ]}
                  layout={{
                    autosize: true,
                    margin: { l: 160, r: 100, t: 20, b: 50 },
                    xaxis: { 
                      title: "Nombre de médailles prévues",
                      color: '#e8ecff',
                      gridcolor: 'rgba(255,255,255,0.1)'
                    },
                    yaxis: {
                      color: '#e8ecff',
                      tickfont: { size: 14, weight: 'bold' }
                    },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(255,255,255,0.03)',
                    font: {
                      color: '#e8ecff',
                      size: 13
                    }
                  }}
                  style={{ width: "100%", height: 320 }}
                  useResizeHandler
                  config={{ displayModeBar: false }}
                />
              </div>
            )}
          </>
        )}
      </section>
        </>
      )}

      {/* DETAILED TAB CONTENT */}
      {activeTab === "detailed" && (
        <div className="detailedPredictions">
          {/* Duel 1: Jeune vs Vétéran */}
          <section className="duelCard">
            <div className="duelHeader">
              <h2>🥊 DUEL : JEUNE PRODIGE vs VÉTÉRAN 🥊</h2>
            </div>
            <div className="duelContent">
              <div className="competitorBox young">
                <div className="competitorIcon">👶</div>
                <h3>Jeune Prodige</h3>
                <p className="competitorAge">20 ans</p>
                <div className="probabilityBar">
                  <div className="barFill" style={{width: '2.97%'}}></div>
                </div>
                <p className="probabilityValue">2.97%</p>
                <p className="probabilityLabel">Chance de médaille d'OR</p>
              </div>
              <div className="vsSymbol">VS</div>
              <div className="competitorBox veteran">
                <div className="competitorIcon">🧓</div>
                <h3>Vétéran Expérimenté</h3>
                <p className="competitorAge">32 ans</p>
                <div className="probabilityBar">
                  <div className="barFill winner" style={{width: '11.40%'}}></div>
                </div>
                <p className="probabilityValue winner">11.40%</p>
                <p className="probabilityLabel">Chance de médaille d'OR</p>
              </div>
            </div>
            <div className="duelConclusion">
              <IoTrophy />
              <span>L'IA préfère l'Expérience !</span>
            </div>
          </section>

          {/* Duel 2: Pays */}
          <section className="duelCard">
            <div className="duelHeader">
              <h2>🏆 DUEL DES CHAMPIONS : L'IMPACT DU DRAPEAU 🏆</h2>
            </div>
            <div className="duelContent vertical">
              <div className="countryCompare">
                <div className="countryBox small">
                  <IoEarth className="countryIcon" />
                  <h3>Petit Pays</h3>
                  <div className="bigPercentage">5.50%</div>
                  <p>Chance de médaille (Toutes couleurs)</p>
                </div>
                <div className="countryBox large">
                  <IoRocket className="countryIcon" />
                  <h3>Super-Puissance</h3>
                  <div className="bigPercentage winner">56.70%</div>
                  <p>Chance de médaille (Toutes couleurs)</p>
                  <div className="medalBreakdown">
                    <div className="medalItem">
                      <span className="medalEmoji">🥇</span>
                      <span className="medalLabel">Or</span>
                      <span className="medalValue">8.45%</span>
                    </div>
                    <div className="medalItem">
                      <span className="medalEmoji">🥈</span>
                      <span className="medalLabel">Argent</span>
                      <span className="medalValue">28.03%</span>
                    </div>
                    <div className="medalItem">
                      <span className="medalEmoji">🥉</span>
                      <span className="medalLabel">Bronze</span>
                      <span className="medalValue">20.21%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="duelConclusion">
              <IoFlash />
              <span>Le poids du pays booste les chances de +51.20%</span>
            </div>
          </section>

          {/* Effet Domicile */}
          <section className="duelCard">
            <div className="duelHeader">
              <h2>🏠 ANALYSE DE L'EFFET DOMICILE (PROFIL CHAMPION) 🏠</h2>
            </div>
            <div className="duelContent">
              <div className="competitorBox away">
                <IoEarth className="competitorIcon" />
                <h3>À l'Étranger</h3>
                <div className="probabilityBar">
                  <div className="barFill" style={{width: '28.97%'}}></div>
                </div>
                <p className="probabilityValue">28.97%</p>
                <p className="probabilityLabel">Chance de médaille</p>
              </div>
              <div className="vsSymbol">VS</div>
              <div className="competitorBox home">
                <IoHome className="competitorIcon" />
                <h3>À Domicile (Paris 2024)</h3>
                <div className="probabilityBar">
                  <div className="barFill winner" style={{width: '41.59%'}}></div>
                </div>
                <p className="probabilityValue winner">41.59%</p>
                <p className="probabilityLabel">Chance de médaille</p>
              </div>
            </div>
            <div className="duelConclusion">
              <span>🔥 LE BOOST PARIS 2024 : +12.61% de chances en plus !</span>
              <span>🥇 Spécifiquement pour l'OR : +1.50%</span>
            </div>
          </section>

          {/* Poids du Palmarès */}
          <section className="duelCard">
            <div className="duelHeader">
              <h2>🥇 LE POIDS DU PALMARÈS 🥇</h2>
            </div>
            <div className="duelContent">
              <div className="competitorBox rookie">
                <IoPeople className="competitorIcon" />
                <h3>Talent Inconnu</h3>
                <p className="competitorAge">0 médaille</p>
                <div className="probabilityBar">
                  <div className="barFill" style={{width: '0%'}}></div>
                </div>
                <p className="probabilityValue">0.00%</p>
                <p className="probabilityLabel">Chance d'OR</p>
              </div>
              <div className="vsSymbol">VS</div>
              <div className="competitorBox champion">
                <IoRibbon className="competitorIcon" />
                <h3>Champion Établi</h3>
                <p className="competitorAge">1 médaille</p>
                <div className="probabilityBar">
                  <div className="barFill winner" style={{width: '11.50%'}}></div>
                </div>
                <p className="probabilityValue winner">11.50%</p>
                <p className="probabilityLabel">Chance d'OR</p>
              </div>
            </div>
            <div className="duelConclusion">
              <IoMedal />
              <span>Le 'statut' de médaillé booste les chances d'Or de : +11.50%</span>
            </div>
          </section>

          {/* David vs Goliath */}
          <section className="duelCard">
            <div className="duelHeader">
              <h2>🌍 L'EFFET DOMICILE BAT-IL LA PUISSANCE ? 🌍</h2>
            </div>
            <div className="duelContent">
              <div className="competitorBox david">
                <div className="competitorIcon">🎯</div>
                <h3>David</h3>
                <p className="competitorAge">Faible + Paris</p>
                <div className="probabilityBar">
                  <div className="barFill" style={{width: '33.65%'}}></div>
                </div>
                <p className="probabilityValue">33.65%</p>
                <p className="probabilityLabel">Chance de médaille</p>
              </div>
              <div className="vsSymbol">VS</div>
              <div className="competitorBox goliath">
                <div className="competitorIcon">💪</div>
                <h3>Goliath</h3>
                <p className="competitorAge">Fort + Visiteur</p>
                <div className="probabilityBar">
                  <div className="barFill winner" style={{width: '54.17%'}}></div>
                </div>
                <p className="probabilityValue winner">54.17%</p>
                <p className="probabilityLabel">Chance de médaille</p>
              </div>
            </div>
            <div className="duelConclusion">
              <span>La Puissance l'emporte malgré l'avantage du terrain !</span>
            </div>
          </section>

          {/* Super-Favori */}
          <section className="duelCard superFavorite">
            <div className="duelHeader">
              <h2>🚀 LE SCORE DU SUPER-FAVORI 🚀</h2>
            </div>
            <div className="superFavContent">
              <div className="favMedal gold">
                <span className="favIcon">🥇</span>
                <span className="favLabel">Or</span>
                <span className="favValue">31.42%</span>
              </div>
              <div className="favMedal silver">
                <span className="favIcon">🥈</span>
                <span className="favLabel">Argent</span>
                <span className="favValue">26.07%</span>
              </div>
              <div className="favMedal bronze">
                <span className="favIcon">🥉</span>
                <span className="favLabel">Bronze</span>
                <span className="favValue">17.31%</span>
              </div>
            </div>
            <div className="totalPodium">
              <IoTrophy />
              <span>TOTAL podium : <strong>74.80%</strong></span>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
