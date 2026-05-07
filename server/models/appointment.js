const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    date: { 
        type: Date, 
        required: true 
    },
  
    description: { 
        type: String, 
        required: true 
    },
    
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'cancelled'], 
        default: 'pending' 
    },
    
    artist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Artist', 
        required: true 
    }
}, { timestamps: true }); 

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;