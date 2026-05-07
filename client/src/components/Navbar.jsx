
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">STUDIO TATTOO</Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/contatti">Contatti</Link></li>
          
          {/* Bottone Dinamico Unico */}
          {!token ? (
            <li>
              <Link to="/login" className="nav-auth-btn">Accedi / Prenota</Link>
            </li>
          ) : (
            <>
              {role === 'admin' && <li><Link to="/dashboard/admin">Admin</Link></li>}
              {role === 'artist' && <li><Link to="/dashboard/artist">Artist</Link></li>}
              {role === 'client' && <li><Link to="/dashboard/client">Miei Appuntamenti</Link></li>}
              <li>
                <button onClick={handleLogout} className="logout-link">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;