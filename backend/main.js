require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASAE_URL);

const app = express();

// Load Routes
const todo = require('./routes/todo');

app.use(express.json());
app.use(cors());
app.use('/todo', todo);

app.listen(3000, () => console.log('Server Started'));
