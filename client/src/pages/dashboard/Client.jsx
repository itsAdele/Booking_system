import { useState, useEffect } from 'react';
import axios from 'axios';
import NewAppointmentForm from '../../components/NewAppointmentForm';
import ProfileBox from '../../components/Profile';

function ClientDashboard() {
  const [appointments, setAppointments] = useState([]);

  
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('${import.meta.env.VITE_API_URL}/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Errore nel caricamento:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (id) => {
    if (!window.confirm("Sei sicuro di voler cancellare questo appuntamento?")) return;

    try {
        const token = localStorage.getItem('token');
        await axios.put(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/status`, 
            { status: 'cancelled' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        fetchAppointments(); 
    } catch (err) {
        alert("Errore nella cancellazione: " + (err.response?.data?.message || "Errore sconosciuto"));
    }
  };

  return (
    <div className="page-container">
      <h1>Area Cliente</h1>
        
        <ProfileBox />

      <section className="dashboard-section">
        <NewAppointmentForm onAppointmentCreated={fetchAppointments} />
      </section>

      <section className="dashboard-section">
        <h2>I miei appuntamenti</h2>
        
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Artista</th>
                <th>Stato</th>
                <th>Azioni</th> 
              </tr>
            </thead>
            <tbody>
              {appointments.map((app) => (
                <tr key={app._id}>
                  <td>{new Date(app.date).toLocaleDateString()}</td>
                  <td>{app.artist ? app.artist.name : "Non specificato"}</td>
                  <td><span className={`status-${app.status}`}>{app.status}</span></td>
                  <td>
                    
                    {app.status === 'pending' && (
                      <button onClick={() => handleCancelAppointment(app._id)}>Cancella</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>  
      </section>
    </div>
  );
}

export default ClientDashboard;