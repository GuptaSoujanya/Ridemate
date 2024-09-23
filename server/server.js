const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Existing Routes (Authentication)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Uber Auth and API Routes
const uberAuthRoutes = require('./routes/uberRoutes');
app.use('/api/uber', uberAuthRoutes); // Mount Uber routes at /api/uber

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
