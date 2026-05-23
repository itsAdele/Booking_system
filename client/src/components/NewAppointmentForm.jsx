import { useState, useEffect } from 'react';
import axios from 'axios';

function NewAppointmentForm({ onAppointmentCreated }) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [artistId, setArtistId] = useState('');
  const [artists, setArtists] = useState([]);

  // Recupera la lista artisti quando il form si monta
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get('${import.meta.env.VITE_API_URL}/api/artists');
        setArtists(res.data);
      } catch (err) {
        console.error("Errore nel caricamento artisti", err);
      }
    };
    fetchArtists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('${import.meta.env.VITE_API_URL}/api/appointments', 
        { date, description, artist: artistId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Richiesta inviata con successo!');
      setDate('');
      setDescription('');
      setArtistId('');
      onAppointmentCreated(); 
    } catch (err) {
      alert(err.response?.data?.message || "Errore nella prenotazione");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h3>Nuova Prenotazione</h3>
      <div className="form-group">
        <label>Scegli Artista</label>
        <select value={artistId} onChange={(e) => setArtistId(e.target.value)} required>
          <option value="">Seleziona un artista...</option>
          {artists.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Data</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Descrizione Tatuaggio</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button type="submit" className="btn-primary">Invia Richiesta</button>
    </form>
  );
}

export default NewAppointmentForm;