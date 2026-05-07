
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ArtistPortfolio from './pages/ArtistPortfolio';
import Contatti from './pages/Contatti';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/dashboard/Admin';
import ArtistDashboard from './pages/dashboard/Artist';
import ClientDashboard from './pages/dashboard/Client';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<ArtistPortfolio />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/artist" element={
          <ProtectedRoute role="artist">
            <ArtistDashboard />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/client" element={
          <ProtectedRoute role="client">
            <ClientDashboard />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;