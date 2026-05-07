const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
    },  

    name: { type: String, required: true },
    specialization: { type: String },
    bio: { type: String },
    imageUrl: { type: String },
    portfolio: [{ type: String }]
});

const Artist = mongoose.models.Artist || mongoose.model('Artist', artistSchema);

module.exports = Artist;