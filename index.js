
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

mongoose.connect('mongodb://localhost/irl')
  .then(() => console.log('Connected to DB...'))
  .catch(err => console.log(err));

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey not in envs.')
  process.exit(1);
}

app.use(express.json())

// Routes
app.use('/api/user', users)
app.use('/api/auth', auth)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
