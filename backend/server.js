// Load Environment Variables
require('dotenv').config()

// Import Dependencies:
// express - Web server framework
const express = require('express')
// mongoose - MongoDB orm (object relational mapper)
const mongoose = require('mongoose')
// workoutRoutes - Custom routes for workout-related api endpoints
const workoutRoutes = require('./routes/workouts')

// Express App - Initialize
const app = express()

// Middleware
// Parses incoming JSON requests
app.use(express.json())
// Logs the request path and method - Debugging
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API Routes
// Registers the workoutRoutes for any route starting with /api/workouts is handled by routes/workouts.js
app.use('/api/workouts', workoutRoutes)

// No longer in use
// app.get('/', (req, res) => {
//     res.send('API is running');
// })

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Server is running on port', process.env.PORT, '...')
        })
    })
    .catch((error) => {
        console.log(error)
    })

