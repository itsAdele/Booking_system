import { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioUploader from '../../components/PortfolioUploader';
import ProfileBox from '../../components/Profile';

function ArtistDashboard() {
    const [artist, setArtist] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const artRes = await axios.get('${import.meta.env.VITE_API_URL}/api/artists/me', config);
            setArtist(artRes.data);

            const appRes = await axios.get('${import.meta.env.VITE_API_URL}/api/appointments/artist', config);
            setAppointments(appRes.data);

        } catch (err) {
            console.error("Errore nel recupero dati:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteImage = async (index) => {
        if (!window.confirm("Vuoi eliminare questa foto?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/artists/${artist._id}/portfolio/${index}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
        } catch (err) {
            alert("Errore durante l'eliminazione");
        }
    };

    if (loading) return <div className="loading-text">Caricamento in corso...</div>;

    return (
        <div className="page-container">
            <h1>Dashboard Artista</h1>

            <ProfileBox isEditable={true} />

            <section className="dashboard-section">
                <h2>Gestione Portfolio</h2>
                {artist && (
                    <PortfolioUploader
                        artistId={artist._id}
                        onUploadSuccess={fetchData}
                    />
                )}

                {artist?.portfolio?.length > 0 ? (
                    <div className="portfolio-grid">
                        {artist.portfolio.map((img, index) => (
                            <div key={index} className="portfolio-item">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${img}`}
                                    alt="Opera"
                                    className="portfolio-img"
                                />
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    className="btn-delete-img"
                                >
                                    Elimina
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-text">Nessuna immagine nel portfolio.</p>
                )}
            </section>

            <section className="dashboard-section">
                <h2>I miei appuntamenti</h2>
                {appointments.length > 0 ? (
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Data</th>
                                <th>Descrizione</th>
                                <th>Stato</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((app) => (
                                <tr key={app._id}>
                                    <td>{app.user?.username || 'Cliente'}</td>
                                    <td>{new Date(app.date).toLocaleDateString()}</td>
                                    <td>{app.description}</td>
                                    <td>
                                        <span className={`status-${app.status}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="empty-text">Nessun appuntamento trovato.</p>
                )}
            </section>
        </div>
    );
}

export default ArtistDashboard;