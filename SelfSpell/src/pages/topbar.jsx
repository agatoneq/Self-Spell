import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <header className="header">
      <div className="logo-name">
        <img src="/logo.png" alt="SelfSpell Logo" />
        <h1>SelfSpell</h1>
      </div>
      <nav className="header-buttons">
        <button>
          <Link to="/dostosuj-preferencje">Dostosuj Preferencje</Link>
        </button>
        <button>
          <Link to="/propozycje">Propozycje</Link>
        </button>
      </nav>
    </header>
  );
};

export default Topbar;
