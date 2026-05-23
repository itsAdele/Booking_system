import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileBox from '../../components/Profile';

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: '',
    specialization: '',
    bio: '',
    email: '',
    password: ''
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const appRes = await axios.get('${import.meta.env.VITE_API_URL}/api/appointments/all', config);
      const artRes = await axios.get('${import.meta.env.VITE_API_URL}/api/artists');

      setAppointments(appRes.data);
      setArtists(artRes.data);
    } catch (err) {
      console.error("Errore nel recupero dati:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/appointments/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      alert("Errore nell'aggiornamento: " + err.response?.data?.message);
    }
  };

  const handleAddArtist = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('${import.meta.env.VITE_API_URL}/api/artists', newArtist, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Artista creato con successo!");
      setNewArtist({ name: '', specialization: '', bio: '', email: '', password: '' });
      fetchData();
    } catch (err) {
      alert("Errore: " + (err.response?.data?.message || "Errore sconosciuto"));
    }
  };

  return (
    <div className="page-container">
      <h1>Dashboard Admin</h1>

      <ProfileBox />

      <section className="dashboard-section">
        <h2>Gestione Prenotazioni</h2>
        {appointments.length === 0 ? (
          <p>Nessuna prenotazione trovata.</p>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Data</th>
                <th>Descrizione</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app._id}>
                  <td>{app.user?.username || app.user?.email || 'Utente'}</td>
                  <td>{new Date(app.date).toLocaleDateString()}</td>
                  <td>{app.description}</td>
                  <td>
                    <span className={`status-${app.status}`}>{app.status}</span>
                  </td>
                  <td>
                    {app.status === 'pending' && (
                      <div className="action-buttons">
                        <button
                          className="btn-confirm"
                          onClick={() => handleUpdateStatus(app._id, 'confirmed')}
                        >
                          Conferma
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() => handleUpdateStatus(app._id, 'cancelled')}
                        >
                          Cancella
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Gestione Artisti</h2>

        <h3>Aggiungi Nuovo Artista</h3>
        <form onSubmit={handleAddArtist} className="admin-artist-form">
          <div className="form-group">
            <label>Nome Artista</label>
            <input
              type="text"
              placeholder="Nome Artista"
              value={newArtist.name}
              onChange={e => setNewArtist({ ...newArtist, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Specializzazione</label>
            <input
              type="text"
              placeholder="Es. Blackwork, Traditional..."
              value={newArtist.specialization}
              onChange={e => setNewArtist({ ...newArtist, specialization: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              placeholder="Breve descrizione dell'artista..."
              value={newArtist.bio}
              onChange={e => setNewArtist({ ...newArtist, bio: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email (per il login)</label>
            <input
              type="email"
              placeholder="email@studio.it"
              value={newArtist.email}
              onChange={e => setNewArtist({ ...newArtist, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password (per il login)</label>
            <input
              type="password"
              placeholder="Password sicura"
              value={newArtist.password}
              onChange={e => setNewArtist({ ...newArtist, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Crea Profilo Artista</button>
        </form>

        <h3 className="artists-list-title">Artisti Registrati</h3>
        <ul className="admin-artist-list">
          {artists.map(art => (
            <li key={art._id}>
              <strong>{art.name}</strong> — {art.specialization}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;