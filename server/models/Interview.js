const mongoose = require('mongoose')

const InterviewSchema = new mongoose.Schema({
    InterviewDate: {
        type: String,
    },
    notes: {
        type: String,
    },
    interviewer: {
        type: String
    },
    status: {
        type: String,
        enum: ['Bad', 'Ok', 'Good', 'Great', 'Superb']
    },
    jobId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job'
    },
})

module.exports = mongoose.model('Interview', InterviewSchema)