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
    status: {
        type: String,
        enum: ['Interviewing', 'Confirmation', 'Ignored']
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    },
})

module.exports = mongoose.model('Job', JobSchema)