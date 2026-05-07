
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <p className="hero-eyebrow">Studio Tattoo — Dal 2010</p>
        <h1>
          Arte su pelle.<br />
          <span>Fatta per durare.</span>
        </h1>
        <p>Ogni tatuaggio è unico come chi lo porta. Scegli il tuo artista e prenota la tua sessione.</p>
        <div className="hero-buttons">
          <Link to="/portfolio" className="btn-primary">Scopri i nostri artisti</Link>
          <Link to="/register" className="btn-secondary">Prenota ora</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;