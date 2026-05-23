
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 1. Funzione per verificare se il token è valido
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: 'Utente non trovato' });
            }

            next(); 
        } catch (error) {
            res.status(401).json({ message: 'Token non valido' });
        }
    } else {
        res.status(401).json({ message: 'Non autorizzato, manca il token' });
    }
};

// 2. Funzione per verificare se l'utente è ADMIN 
const isAdmin = (req, res, next) => {
    
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        
        res.status(403).json({ message: "Accesso negato. Solo gli amministratori possono eseguire questa operazione." });
    }
};

// 3. Esportiamo ENTRAMBE
module.exports = { protect, isAdmin };