import { useState } from 'react';
import axios from 'axios';

function PortfolioUploader({ artistId, onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Seleziona una foto!");
    
    const formData = new FormData();
    formData.append('image', file); 

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/artists/${artistId}/upload`, formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Foto caricata con successo!");
      if (onUploadSuccess) onUploadSuccess();

    } catch (err) {
      console.error(err);
      alert("Errore nell'upload");
    }
  };

  return (
    <div className="uploader-box">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Carica Opera</button>
    </div>
  );
}

export default PortfolioUploader;