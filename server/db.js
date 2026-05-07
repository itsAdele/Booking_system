const mongoose = require('mongoose');
require('dotenv').config(); // Carica le variabili dal file .env

const connectDB = async () => {
    try {
        // Connessione a MongoDB utilizzando la URI definita nel file .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connesso con successo!');
    } catch (err) {
        console.error('Errore di connessione:', err.message);
        
        process.exit(1);
    }
};

module.exports = connectDB;