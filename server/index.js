const express = require('express')
const colors = require('colors')
const cors = require('cors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')

// ESTABLISH CONNECTION TO DB
connectDB()

// DEFINE PORT LISTENER
const port = process.env.PORT || 5000

// START SERVER
const app = express()
app.use(cors())

// GRAPHQL PLAYGROUND
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

// RUN LISTENER
app.listen(port, console.log(`Server running on port ${port}`))