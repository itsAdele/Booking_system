
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Portfolio() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_API_URL}/api/artists`)
      .then(res => {
        setArtists(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore nel caricamento artisti:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-text">Caricamento artisti...</p>;

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">I Nostri Artisti</h1>
      <div className="artists-grid">
        {artists.map((artist) => (
          <div key={artist._id} className="artist-card">
            {artist.imageUrl && (
              <img
                src={artist.imageUrl.startsWith('http') ? artist.imageUrl : `${import.meta.env.VITE_API_URL}${artist.imageUrl}`}
                alt={artist.name}
                className="artist-card-img"
              />
            )}
            <h3>{artist.name}</h3>
            <p className="artist-specialization">{artist.specialization}</p>
            <p className="artist-bio">{artist.bio}</p>

            <div className="artist-card-actions">
              <Link to={`/portfolio/${artist._id}`} className="btn-portfolio">
                Vedi Portfolio
              </Link>
              {localStorage.getItem('token') ? (
                <Link to="/dashboard/client" className="btn-booking">
                  Prenota
                </Link>
              ) : (
                <Link to="/login" className="btn-booking">
                  Prenota
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;