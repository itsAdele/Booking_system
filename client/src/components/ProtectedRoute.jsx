
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  console.log("DEBUG Protezione - Token trovato:", token);
  console.log("DEBUG Protezione - Ruolo trovato:", userRole);
  console.log("DEBUG Protezione - Ruolo richiesto dalla rotta:", role);

  // Se non c'è il token, non sei loggata
  if (!token) {
    console.warn("DEBUG: Accesso negato, token mancante!");
    return <Navigate to="/login" />;
  }

  // Se l'utente ha un ruolo diverso
  if (role && userRole !== role) {
    console.warn("DEBUG: Ruolo non corrispondente! Hai:", userRole, "ma serve:", role);
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;