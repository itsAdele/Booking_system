const Artist = require('../models/artist');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// GET: Tutti gli artisti
exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero artisti" });
    }
};

// GET: Singolo artista per ID (per la pagina Portfolio pubblica)
exports.getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: "Artista non trovato" });
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero artista" });
    }
};

// POST: Crea artista + utente login (Solo Admin)
exports.createArtist = async (req, res) => {
    try {
        const { name, specialization, bio, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username: name,
            email,
            password: hashedPassword,
            role: 'artist'
        });

        const artist = await Artist.create({
            user: newUser._id,
            name,
            specialization,
            bio
        });

        res.status(201).json({ artist, user: newUser });
    } catch (err) {
        res.status(500).json({ message: "Errore creazione artista: " + err.message });
    }
};

// GET: Profilo artista loggato
exports.getMe = async (req, res) => {
    try {
        const artist = await Artist.findOne({ user: req.user._id });
        if (!artist) return res.status(404).json({ message: "Profilo artista non trovato" });
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero profilo" });
    }
};

// POST: Carica immagine portfolio
exports.uploadPortfolioImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Nessun file caricato!" });

        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: "Artista non trovato" });

        if (artist.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Non autorizzato" });
        }

        const filePath = `/uploads/${req.file.filename}`;
        artist.portfolio.push(filePath);
        await artist.save();
        res.status(200).json({ message: "Foto caricata con successo", url: filePath });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET: Portfolio pubblico di un artista
exports.getArtistPortfolio = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: "Artista non trovato" });
        res.status(200).json(artist.portfolio);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero portfolio" });
    }
};

// DELETE: Elimina immagine portfolio
exports.deletePortfolioImage = async (req, res) => {
    try {
        const { id, index } = req.params;
        const artist = await Artist.findById(id);
        if (!artist) return res.status(404).json({ message: "Artista non trovato" });

        if (artist.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Non autorizzato" });
        }

        artist.portfolio.splice(index, 1);
        await artist.save();
        res.status(200).json({ message: "Foto eliminata con successo" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};