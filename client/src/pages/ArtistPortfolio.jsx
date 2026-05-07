import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ArtistPortfolio() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/api/artists/${id}`)
      .then(res => {
        setArtist(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore nel recupero artista:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading-text">Caricamento...</p>;
  if (!artist) return <p className="loading-text">Artista non trovato.</p>;

  return (
    <div className="page-container">
      <div className="artist-profile-header">
        {artist.imageUrl && (
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="artist-profile-img"
          />
        )}
        <div className="artist-profile-info">
          <h1>{artist.name}</h1>
          <p className="artist-specialization">{artist.specialization}</p>
          <p className="artist-bio">{artist.bio}</p>
        </div>
      </div>

      <h2 className="section-title">Portfolio</h2>

      {artist.portfolio?.length > 0 ? (
        <div className="portfolio-public-grid">
          {artist.portfolio.map((img, index) => (
            <div key={index} className="portfolio-public-item">
              <img
                src={`http://localhost:5000${img}`}
                alt={`Opera ${index + 1}`}
                className="portfolio-public-img"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-text">Nessuna immagine nel portfolio.</p>
      )}
    </div>
  );
}

export default ArtistPortfolio;