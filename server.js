const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

// set up express app
const app = express();

app.use(express.static('public'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/build')))

app.use(cors())

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err.message); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// conectting to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true
     }, (err)=> {
    if (err) return console.log(err)
    console.log('The server is conncected to MongoDB database')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
})