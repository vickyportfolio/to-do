const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// initializing built in modules
const TaskModel = require('./models/Tasks');
//

// provoking and implementing express server backend connection
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// connecting backend to the database (mongoose)
const url = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(url)
  .then(() => console.log('successfully connected to the database'))
  .catch((err) => console.log(err));

// writing apis

// getting tasks
app.get('/getTasks', (req, res) => {
  TaskModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

//creating tasks
app.post('/createTask', async (req, res) => {
  const task = req.body;
  const newTask = new TaskModel(task);
  await newTask.save();
  res.json(task);
});

// start of the application
app.listen('3001', () => {
  console.log('Server is Started Successfully');
});
