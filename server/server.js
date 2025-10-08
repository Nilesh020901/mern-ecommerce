const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth.routes');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Pragma"
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`server running ${PORT}`))