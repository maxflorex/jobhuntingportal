const express = require('express')
const colors = require('colors')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')

// ESTABLISH CONNECTION TO DB
connectDB()

// DEFINE PORT LISTENER
const port = process.env.PORT || 5000

// START SERVER
const app = express()
app.use(cors())

// RUN LISTENER
app.listen(port, console.log(`Server running on port ${port}`))