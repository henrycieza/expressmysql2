
import indexRouter from './routes/index';
//console.log(indexRouter);
//const { check, validationResult } = require('express-validator');
//const { param, query, cookies, header, body} = require ('express-validator'); 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var hbs = require('hbs');
var bodyParser = require('body-parser');

//importando rutas de customer
const customerRoutes = require('../routes/index');

//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(expressValidator());
app.use('/', indexRouter);
//app.use('/users', usersRouter);
// RUTAS
app.use('/customer',customerRoutes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.end();
  console.error(err);
});

// app.post('/customerstest',
// [
//   check('first_name','invalide name').isLength({min:4 , max :150}),
//   check('last_name','invalide last name').isLength({min:4 , max :150}),
//   check('document_number','invalide DNI').isLength({max :15}),
//   check('country','invalide country').isLength({min:4, max:100}),
//   check('contact_email','invalide email').isEmail()
//   //console.log("datos leidos : " + req.body.first_name+' ' +req.body.last_name+' '+req.body.document_number+' '+req.body.country)

// ], function(req,res){
//         const errors = validationResult(req);
//         console.log(errors);
  //       console.log(req.body);
  //     if (!errors.isEmpty()) {
  //       console.log('dentro del if');
  //       console.log(errors);
  //       return res.status(422).json({ errors: errors.array() });
  //       res.render('error', { title: 'USUARIO INSERTADO POST', error });
  //     }else {
  //       let first_name = req.body.first_name;
  //       let last_name = req.body.last_name;
  //       let document_number = req.body.document_number;
  //       let country = req.body.country;   
  //       let contact_email = req.body.contact_email;
  //     //   res.send({});
  //     // } 
  // const data = [];

  // mySqlConnectionFactory().then(connection => {
  //   const query =  'INSERT INTO personal_data (first_name, last_name, document_number, country) VALUES (?,?,?,?);';
  //   connection.query(query, [first_name,last_name,document_number,country]);
    
    
  //   //console.log('****** fin insert personal_data *******');

  //   const query2 = 'INSERT INTO customer (personal_data_id, contact_email) VALUES ( LAST_INSERT_ID() , ?)';
  //   connection.query(query2,[contact_email]);
  //   //console.log('ultimo registro customer insertado :' + LAST_INSERT_ID());
  //   console.log('**********fin insert customer *************')
  //     //.on('error', error => res.render('error', { title: 'USUARIO INSERTADO POST', error }))
  //     .on('result', row =>console.log(row))
  //     //.on('result', row =>console.log('id Personal Data : '+ idCustomer))
  //     //.on('end', () => res.send(200));
  // }).catch(error => console.error(error));
  // res.send('respond with a resource');
  //} 
// });
module.exports = app;
