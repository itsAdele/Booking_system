const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); 
const authRoutes = require('./routes/authRoutes'); 
const appointmentRoutes = require('./routes/appointmentRoutes'); 
const artistRoutes = require('./routes/artistRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json()); 
app.use(cors());  //  diventa così quando publiccato-> app.use(cors({origin: 'https://tuo-sito-portfolio.com' così facendo Solo il mio sito potrà chiamare il server}));
app.use('/uploads', express.static('uploads'));

connectDB();

// ROTTE
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Il server è online e il database è connesso!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

