
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/authMiddleware');

// GET: Ottieni i dati dell'utente loggato
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Errore nel caricamento profilo" });
    }
});

// PUT: Aggiorna dati profilo (username, bio, imageUrl)
router.put('/profile', protect, async (req, res) => {
    try {
        const { username, bio, imageUrl } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, bio, imageUrl },
            { new: true }
        ).select('-password');

        if (!user) return res.status(404).json({ message: "Utente non trovato" });

        res.json(user);
    } catch (err) {
        console.error("Errore backend:", err);
        res.status(500).json({ message: "Errore nell'aggiornamento" });
    }
});

// PUT: Cambia password
router.put('/change-password', protect, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "Utente non trovato" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password attuale errata" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password aggiornata con successo!" });
    } catch (err) {
        res.status(500).json({ message: "Errore nell'aggiornamento password" });
    }
});

// PUT: Cambia email
router.put('/change-email', protect, async (req, res) => {
    try {
        const { newEmail, password } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "Utente non trovato" });

        // Verifica la password prima di cambiare email
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password errata" });

        // Controlla che la nuova email non sia già in uso
        const existing = await User.findOne({ email: newEmail });
        if (existing) return res.status(400).json({ message: "Email già in uso" });

        user.email = newEmail;
        await user.save();

        res.json({ message: "Email aggiornata con successo!" });
    } catch (err) {
        res.status(500).json({ message: "Errore nell'aggiornamento email" });
    }
});

module.exports = router;