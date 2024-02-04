require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Use routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);

// Root URL route
app.get('/', (req, res) => {
  res.send('Library Management API is running. Use /api/books, /api/users, and /api/loans to access the respective resources.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;