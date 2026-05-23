import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard/client'); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('${import.meta.env.VITE_API_URL}/api/auth/register', {
        username, email, password
      });
      alert('Registrazione avvenuta con successo!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Errore durante la registrazione");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Crea il tuo Account</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-login">Registrati</button>
        </form>

        <div className="auth-footer">
          <p>Hai già un account? <Link to="/login">Accedi</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;