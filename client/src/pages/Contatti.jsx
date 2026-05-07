
function Contatti() {
  return (
    <div className="page-container">
      <h1>Contatti</h1>

      <div className="contatti-grid">
        <div className="contatti-card">
          <h3>Dove siamo</h3>
          <p>Via Roma 42</p>
          <p>Milano, 20100</p>
        </div>

        <div className="contatti-card">
          <h3>Orari</h3>
          <p>Lunedì — Venerdì: 10:00 — 19:00</p>
          <p>Sabato: 10:00 — 17:00</p>
          <p>Domenica: Chiuso</p>
        </div>

        <div className="contatti-card">
          <h3>Contattaci</h3>
          <p>Email: info@studiotattoo.it</p>
          <p>Tel: +39 02 1234567</p>
        </div>
      </div>

      <div className="contatti-note">
        <p>
          Per prenotazioni ti consigliamo di registrarti e usare il nostro sistema di booking online.
          Per richieste speciali o informazioni puoi scriverci via email.
        </p>
      </div>
    </div>
  );
}

export default Contatti;