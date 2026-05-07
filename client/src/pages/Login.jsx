import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      console.log("Risposta server:", res.data); 

      const { token, role: serverRole, user } = res.data;
      
      
      let role = serverRole || (user && user.role);

      
      if (role === 'user') {
        role = 'client';
      }

      
      if (!token) {
        throw new Error("Token mancante nella risposta del server.");
      }
      if (!role) {
        throw new Error("Il server non ha inviato il ruolo utente. Controlla il backend.");
      }
     
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert('Login effettuato!');
      
      if (role === 'admin') {
        navigate('/dashboard/admin');
      } else if (role === 'artist') {
        navigate('/dashboard/artist');
      } else {
        navigate('/dashboard/client');
      }
      
    } catch (err) {
      console.error("Errore login:", err);
      
      const message = err.response?.data?.message || err.message || "Errore di connessione";
      alert(`Login fallito: ${message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Accedi al tuo Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Inserisci la tua email"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Inserisci la tua password"
              required 
            />
          </div>
          <button type="submit" className="btn-login">Entra</button>
        </form>
        <div className="auth-footer">
          <p>Non hai un account? <Link to="/register">Registrati</Link></p>
        </div>

      </div>
    </div>
  );
}

export default Login;