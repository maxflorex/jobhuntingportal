const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
    },
    logo: {
        type: String
    },
    jobTitle: {
        type: String,
    },
    jobDesc: {
        type: String,
    },
    category: {
        type: String,
        enum: ['Design', 'Production', 'Development']
    },
    status: {
        type: String,
        enum: ['Having an interview', 'Email confirmation', 'Completely Ghosted']
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)