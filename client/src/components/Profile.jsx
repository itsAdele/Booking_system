
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileBox({ isEditable = true }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailData, setEmailData] = useState({
    newEmail: '',
    password: ''
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error("Errore nel caricamento profilo", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
        username: user.username,
        bio: user.bio,
        imageUrl: user.imageUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      alert("Profilo aggiornato!");
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Errore nel salvataggio");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Le nuove password non coincidono!");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.response?.data?.message || "Errore nel cambio password");
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/change-email`, {
        newEmail: emailData.newEmail,
        password: emailData.password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      setShowEmailForm(false);
      setEmailData({ newEmail: '', password: '' });
      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Errore nel cambio email");
    }
  };

  if (loading) return <div className="profile-box">Caricamento in corso...</div>;
  if (!user) return <div className="profile-box">Errore nel caricamento del profilo.</div>;

  return (
    <div className="profile-box">
      <div className="profile-header">
        <h3>Il Mio Profilo</h3>
        {isEditable && (
          <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? '💾 Salva' : '✏️ Modifica'}
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="avatar-container">
          <img
            src={user.imageUrl || 'https://via.placeholder.com/100'}
            alt="Profilo"
            className="profile-img"
          />
        </div>

        <div className="profile-details">
          {isEditing ? (
            <div className="edit-form">
              <input
                value={user.username || ''}
                onChange={e => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
              />
              <input
                value={user.imageUrl || ''}
                onChange={e => setUser({ ...user, imageUrl: e.target.value })}
                placeholder="URL Immagine profilo"
              />
              <textarea
                value={user.bio || ''}
                onChange={e => setUser({ ...user, bio: e.target.value })}
                placeholder="La tua bio..."
              />
            </div>
          ) : (
            <div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Bio:</strong> {user.bio || "Nessuna bio inserita"}</p>
            </div>
          )}
        </div>
      </div>

      {isEditable && (
        <div className="profile-security">
          <div className="security-buttons">
            <button
              className="btn-security"
              onClick={() => {
                setShowPasswordForm(!showPasswordForm);
                setShowEmailForm(false);
              }}
            >
              {showPasswordForm ? 'Annulla' : 'Cambia Password'}
            </button>
            <button
              className="btn-security"
              onClick={() => {
                setShowEmailForm(!showEmailForm);
                setShowPasswordForm(false);
              }}
            >
              {showEmailForm ? 'Annulla' : 'Cambia Email'}
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handleChangePassword} className="security-form">
              <h4>Cambia Password</h4>
              <div className="form-group">
                <label>Password Attuale</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nuova Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Conferma Nuova Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-submit">Aggiorna Password</button>
            </form>
          )}

          {showEmailForm && (
            <form onSubmit={handleChangeEmail} className="security-form">
              <h4>Cambia Email</h4>
              <div className="form-group">
                <label>Nuova Email</label>
                <input
                  type="email"
                  value={emailData.newEmail}
                  onChange={e => setEmailData({ ...emailData, newEmail: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Conferma con la tua Password</label>
                <input
                  type="password"
                  value={emailData.password}
                  onChange={e => setEmailData({ ...emailData, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-submit">Aggiorna Email</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileBox;