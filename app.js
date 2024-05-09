// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors=require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var departRouter =require('./routes/department');
var jobApplicantRouter=require('./routes/job_applicants');
var jobOpeningRouter=require('./routes/job_openings');


const port=process.env.PORT || 5000;

var app = express();


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
// app.set('view engine', 'jade');
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const corsOptions ={
    origin:allowedOrigins, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',departRouter);
app.use('/',jobApplicantRouter);
app.use('/',jobOpeningRouter);


app.listen(port,()=>{
console.log(`app is listening at the port ${port}`)
})
module.exports = app;
