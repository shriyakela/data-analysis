// Server setup code
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost/recipeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes

app.use('/recipes', recipeRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html'); 
});

app.get('/add-recipe', (req, res) => {
    res.sendFile(__dirname + '/public/add-recipe.html');
});
app.use('/users', userRoutes);
// Server listening
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
