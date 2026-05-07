import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">STUDIO TATTOO</span>
          <p className="footer-tagline">Arte su pelle, fatta per durare.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contatti">Contatti</Link>
          <Link to="/register">Prenota</Link>
        </div>

        <div className="footer-copy">
          <p>© 2026 Studio Tattoo. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;