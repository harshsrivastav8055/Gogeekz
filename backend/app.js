// backend/app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const leadRoutes = require('./routes/leadRoutes');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/leads', leadRoutes);
module.exports = app;
