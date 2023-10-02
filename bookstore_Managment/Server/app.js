var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var mongoose = require('mongoose');
var createError = require('http-errors'); // Added require for createError module
var indexRouter = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes')
const auth = require('./middleware/auth')
var app = express();
app.use(cors());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/books', bookRoutes);
app.use('/review', reviewRoutes);


app.use(function(req, res, next) {
  next(createError(404));
});



app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});





mongoose.connect('mongodb://127.0.0.1:27017/bookStoreManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database Connected");
})
.catch((err) => {
  console.error("Database Connection Error:", err);
});



module.exports = app;
