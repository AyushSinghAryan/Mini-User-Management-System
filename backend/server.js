const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

dotenv.config();


if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const app = express();

// Middleware
app.use(express.json()); // Body parser
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(helmet());       // Set security headers

// Mount Routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;

// --- REFACTOR START ---
// Only listen to the port if we are NOT in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the app for testing
module.exports = app;
// --- REFACTOR END ---