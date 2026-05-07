# Tattoo Booking System

Piattaforma web fullstack per la gestione delle prenotazioni di uno studio tattoo.

## Tecnologie

- **Frontend:** React.js, React Router, Axios 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Autenticazione:** JWT, bcryptjs
- **Upload:** Multer

## Struttura del progetto
Booking_system/
├── client/              # Frontend React
├──  server/             # Backend Node/Express
├── .gitignore        
├──  package-lock.json  
├── package.json        
└── README.md  


## Come avviare il progetto


### Backend
cd server
npm install
node server.js

### Frontend

cd client
npm install
npm run dev


## Variabili d'ambiente

Crea un file `.env` nella cartella `server/` con:
PORT=5000
MONGO_URI=la_tua_uri_mongodb
JWT_SECRET=il_tuo_segreto

## Funzionalità

- Registrazione e login con ruoli (admin, artist, client)
- Prenotazione appuntamenti con scelta artista
- Dashboard dedicata per ogni ruolo
- Portfolio artisti con upload immagini
- Gestione completa appuntamenti (conferma/cancella)
- Modifica profilo, email e password

## Sicurezza

- Le password degli utenti sono criptate con bcryptjs.
- Le rotte sensibili sono protette tramite middleware JWT (JSON Web Token).
- Utilizzo di variabili d'ambiente per isolare chiavi sensibili e URI del database.S