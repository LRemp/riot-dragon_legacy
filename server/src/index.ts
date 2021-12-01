import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const playerRouter = require('./routes/player');
const indexRouter = require('./routes/index');

app.use('/', indexRouter);
app.use('/player', playerRouter);
app.use('/images', express.static('images'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})