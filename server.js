require("dotenv").config();
const express = require('express');
/* const cookieParser = require('cookie-parser'); */
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");


const passport = require("./passport");
const cookieSession = require('cookie-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const twitterAPI = require('./routes/api/tweet');
const API = require("./routes/api/news");
const candidateAPI = require("./routes/api/candidates");
const myinfoAPI = require("./routes/api/myinfo");
const favoriteAPI = require("./routes/api/favorite");

const PORT = process.env.PORT || 3001;

const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/authentication' || "mongodb://user:poop123@ds163354.mlab.com:63354/heroku_09nsqj9v"
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// mongoose.connect('mongodb://localhost/authentication', {useNewUrlParser: true});

app.use(cors());
// Use APIs
app.use("/api", API);
app.use('/api', twitterAPI);
app.use('/api', candidateAPI);
app.use("/api", myinfoAPI);
app.use("/api", favoriteAPI);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());
app.use('/authentication', usersRouter);
app.use('/', indexRouter);







app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})

module.exports = app;
