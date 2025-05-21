require("@babel/register")({
    extensions: [".js", ".jsx"],
    ignore: [/node_modules/],
});

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/database");
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/therapists', require('./routes/api/therapists'));
app.use('/api/appointments', require('./routes/api/appointments'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/groups', require('./routes/api/groups'));
app.use('/api/support', require('./routes/api/support'));

// Handle all routes through React Router
app.use((req, res) => {
    const webRoutes = require("./routes/web");
    webRoutes(req, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});