import { NavLink, Outlet } from "react-router-dom";
import { IoHomeSharp, IoStatsChart, IoTrophy, IoInformationCircle } from "react-icons/io5";
import "./layout.css";

const linkClass = ({ isActive }) => (isActive ? "navLink active" : "navLink");

export default function AppLayout() {
  return (
    <div className="appShell">
      <header className="topbar">
        <div className="brand">
          <span className="brandIcon">🏅</span>
          <span className="brandText">Olympics Paris 2024</span>
        </div>

        <nav className="nav">
          <NavLink to="/" className={linkClass} end>
            <IoHomeSharp className="navIcon" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/analysis" className={linkClass}>
            <IoStatsChart className="navIcon" />
            <span>Analysis</span>
          </NavLink>
          <NavLink to="/predictions" className={linkClass}>
            <IoTrophy className="navIcon" />
            <span>Predictions</span>
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            <IoInformationCircle className="navIcon" />
            <span>About</span>
          </NavLink>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footerContent">
          <p>© 2026 Olympics Predictions • Powered by AI & Data Analytics 🚀</p>
        </div>
      </footer>
    </div>
  );
}
