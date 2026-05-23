const Appointment = require('../models/appointment'); 
const Artist = require('../models/artist');

// 1. Creare un nuovo appuntamento
exports.createAppointment = async (req, res) => {
    try {
        const { date, description, artist } = req.body; 
        
        const newAppointment = new Appointment({
            user: req.user.id, 
            date,
            description,
            artist, 
            status: 'pending' 
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appuntamento creato con successo!", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Errore nel server", error: error.message });
    }
};

// 2. Leggi tutti gli appuntamenti (utente)
exports.getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id }).populate('artist', 'name').sort({ date: 1 });
        
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero degli appuntamenti", error: err.message });
    }
};

// 3. Leggi TUTTI gli appuntamenti (solo per ADMIN)
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('user', 'name email');
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero", error: err.message });
    }
};

// 4. Leggi gli appuntamenti di un artista (solo per ARTIST)
exports.getArtistAppointments = async (req, res) => {
    try {
        
        const artist = await Artist.findOne({ user: req.user._id });
        
        if (!artist) {
            return res.status(404).json({ message: "Profilo artista non trovato" });
        }

        
        const appointments = await Appointment.find({ artist: artist._id })
            .populate('user', 'username email'); 
            
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero appuntamenti: " + err.message });
    }
};

// 4. Aggiorna lo stato (conferma, cancella, ecc.)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ message: "Appuntamento non trovato" });

        // LOGICA DI CONTROLLO
        const isOwner = appointment.user.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin'; 

        
        if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: "Non hai il permesso di modificare questo appuntamento" });
        }

        
        if (!isAdmin && status === 'confirmed') {
            return res.status(403).json({ message: "Solo l'admin può confermare un appuntamento" });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ message: `Stato aggiornato a: ${status}`, appointment });
    } catch (err) {
        res.status(500).json({ message: "Errore nel server", error: err.message });
    }
};