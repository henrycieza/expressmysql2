import express from 'express';
import expressValidator from 'express-validator';
import mySqlConnectionFactory from '../mysql/MySqlConnectionFactory';
import generatorCode from '../public/javascripts/generatorCode';

const { check, validationResult } = require('express-validator');
const { param, query, cookies, header, body} = require ('express-validator'); 
const app = express();
//const server = express(); 
app.get('/', function(req, res, next) {
  
  const data = [];
 // const idCustomer = "";
  mySqlConnectionFactory({ }).then(connection => {
    const query = 'SELECT * FROM personal_data';
    connection.query(query)
      //.on('error', error => res.render('error', { title: 'Express', error }))
      .on('error', error => console.error('error', { title: 'USUARIOS', error }))
      .on('result', row => data.push({ id: row.id, first_name: row.first_name, last_name: row.last_name, document_number: row.document_number, country:row.country}))
      //.on('result', row =>console.log(row))
      .on('end', () => res.render('index', { title: 'USUARIOS', data }));
  }).catch(error => console.error(error));
  
});

/***************  GET by ID users listing. ************************/
app.get('/:id', function(req, res, next) {
  console.log('dentro de get/id');
  let userId = req.params.id;
  console.log(userId);
  let data = [];

  mySqlConnectionFactory({ }).then(connection => {
    const query = 'SELECT * FROM personal_data WHERE id = ?';
    console.log(userId);
    connection.query(query,[userId])
    
      .on('error', error => res.render('error', { title: 'USUARIOS POR ID', error }))
      .on('result', row => data = row)
      .on('result', row =>console.log(row))
      .on('end', () => res.render('userid', { title: 'USUARIOS POR ID', data }))
      .on('end', () => res.send(200));
  }).catch(error => console.error(error));
  

 // res.send('respond with a resource');
});
/************************************************************************/
/************************************************************************/

/************************ REGISTRO CUSTOMER  *****************************/
/******************* POST (/registro/customer) ***************************/
app.post('/customer',
[
  check('first_name','invalide name').isLength({min:4 , max :150}),
  check('last_name','invalide last name').isLength({min:4 , max :150}),
  check('document_number','invalide DNI').isLength({max :15}),
  check('country','invalide country').isLength({min:4, max:100}),
  check('contact_email','invalide email').isEmail()
  //console.log("datos leidos : " + req.body.first_name+' ' +req.body.last_name+' '+req.body.document_number+' '+req.body.country)

], function(req,res){
        const errors = validationResult(req);
        console.log(req.body);
      if (!errors.isEmpty()) {
        console.log('dentro del if');
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
        res.render('error', { title: 'USUARIO INSERTADO POST', error });
      }else {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let document_number = req.body.document_number;
        let country = req.body.country;   
        let contact_email = req.body.contact_email;
      //   res.send({});
      // } 
  const data = [];

  mySqlConnectionFactory().then(connection => {
    const query =  'INSERT INTO personal_data (first_name, last_name, document_number, country) VALUES (?,?,?,?);';
    connection.query(query, [first_name,last_name,document_number,country], function(err, result){
      if (err) throw err;
      let idCustomer =  result.insertId;
      console.log("customer ultimo id : " + idCustomer);
    });
    
    //console.log('****** fin insert personal_data *******');

    const query2 = 'INSERT INTO customer (personal_data_id, contact_email) VALUES ( LAST_INSERT_ID() , ?)';
    connection.query(query2,[contact_email]);
   
    console.log('**********fin insert customer *************')
      //.on('error', error => res.render('error', { title: 'USUARIO INSERTADO POST', error }))
      //.on('result', row =>console.log(row))
      //.on('result', row =>console.log('id Personal Data : '+ idCustomer))
      //.on('end', () => res.send(200));
  }).catch(error => console.error(error));
  res.send('respond with a resource');
  } 
 });

 /************************ REGISTRO GUEST  *****************************/
/******************* POST (/registro/guest) ***************************/
app.post('/guest',
[
 
  check('first_name','invalide name').isLength({min:4 , max :150}),
  check('last_name','invalide last name').isLength({min:4 , max :150}),
  check('document_number','invalide DNI').isLength({max :15}),
  check('country','invalide country').isLength({min:4, max:100}),
  check(' bird_date','invalide format date').isLength({max:15})
  //console.log("datos leidos : " + req.body.first_name+' ' +req.body.last_name+' '+req.body.document_number+' '+req.body.country)

], function(req,res){
        const errors = validationResult(req);
        console.log(req.body);
      if (!errors.isEmpty()) {
        console.log('dentro del if');
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
        res.render('error', { title: 'USUARIO INSERTADO POST', error });
      }else {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let document_number = req.body.document_number;
        let country = req.body.country;   
        let bird_date = req.body.bird_date;
      //   res.send({});
      // } 
  const data = [];

  mySqlConnectionFactory().then(connection => {
    const query =  'INSERT INTO personal_data (first_name, last_name, document_number, country) VALUES (?,?,?,?);';
    connection.query(query, [first_name,last_name,document_number,country]);
    
    
    //console.log('****** fin insert personal_data *******');

    const query2 = "INSERT INTO guest (personal_data_id, bird_date) VALUES ( LAST_INSERT_ID() ,STR_TO_DATE( ? ,'%d-%m-%Y'))";
    connection.query(query2,[bird_date]);
    //console.log('ultimo registro customer insertado :' + LAST_INSERT_ID());
    console.log('**********fin insert guest *************')
      //.on('error', error => res.render('error', { title: 'USUARIO INSERTADO POST', error }))
      //.on('result', row =>console.log(row))
      //.on('result', row =>console.log('id Personal Data : '+ idCustomer))
      //.on('end', () => res.send(200));
  }).catch(error => console.error(error));
  res.send('respond with a resource');
  } 
 });




/********************* REGISTRO APARTMENTS  **************************/
/******************* POST (/registro/guest) ***************************/
// app.post('/apartments',
// [
 
//   check('adress','invalide name').isLength({min:4 , max :150}),
//   //check('url','invalide last name').isLength({min:4 , max :150}),
//   check('number_rooms','number greater than zero').isLength({max :15}),
//   check('postal_code','invalid postal code').isInt(),
  
//   //console.log("datos leidos : " + req.body.first_name+' ' +req.body.last_name+' '+req.body.document_number+' '+req.body.country)

// ], function(req,res){
//         const errors = validationResult(req);
//         console.log(req.body);
//       if (!errors.isEmpty()) {
//         console.log('dentro del if');
//         console.log(errors);
//         return res.status(422).json({ errors: errors.array() });
//         res.render('error', { title: 'USUARIO INSERTADO POST', error });
//       }else {
//         let adress = req.body.adress;
//         const url = "../uploads/";
//         let number_rooms = req.body.number_rooms;
//         let postal_code = req.body.postal_code;   
        
//       //   res.send({});
//       // } 
//   const data = [];

//   mySqlConnectionFactory().then(connection => {
//     const query =  'INSERT INTO apartments (adress, url, number_rooms, postal_code) VALUES (?,?,?,?);';
//     connection.query(query, [adress,url,number_rooms,postal_code]);
//     let idApartment = LAST_INSERT_ID();    
//     console.log('****** fin insert apartments *******')
   
//       //.on('error', error => res.render('error', { title: 'USUARIO INSERTADO POST', error }))
//       .on('result', row =>console.log(row))
//       //.on('result', row =>console.log('id Personal Data : '+ idCustomer))
//       //.on('end', () => res.send(200));
//   }).catch(error => console.error(error));
//   res.send('respond with a resource');
//   } 
//  });


/************************ REGISTRO BOOKING  *****************************/
/******************* POST (/registro/booking) ***************************/
app.post('/booking',
[
  check('adress','debe seleccionar una opcion').isLength({max:150}),
  check('arrival_date','invalide formant date').isLength({max:15}),
  check('departure_date','invalide formant date').isLength({max:15}),
  check('num_guest','number greater than zero').isInt()
  
], function(req,res){
        const errors = validationResult(req);
        console.log(req.body);
      if (!errors.isEmpty()) {
        console.log('dentro del if');
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
        res.render('error', { title: 'USUARIO INSERTADO POST', error });
      }else {
        let adress = req.body.adress;
        let code = generatorCode;
        let arrival_date = req.body.arrival_date;
        let departure_date = req.body.departure_date;
        let num_guest = req.body.country;   
        
      //   res.send({});
      // } 
  const data = [];
   //console.log("idcustomer :" + idCustomer);     
  mySqlConnectionFactory().then(connection => {
    let  idApartment = connection.query("SELECT id FROM apartments WHERE adress = ? ",[adress])
    console.log("IdApartment : "+ idApartment);
    let idCustomer = connection.query("SELECT personal_data_id FROM customer ORDER BY personal_data_id DESC LIMIT 1;");
    console.log("IdCustomer: "+ idCustomer);
    const query2 =  "INSERT INTO booking (code, arrival_date, departure_date, num_guest, customer_personal_data_id, apartments_id) VALUES ( STR_TO_DATE( ? ,'%d-%m-%Y'), STR_TO_DATE( ? ,'%d-%m-%Y'),?,?,?,?);";
    connection.query(query2, [code,arrival_date,departure_date,num_guest,idCustomer, idApartment]);
        
    console.log('****** fin insert booking *******')

        .on('result', row =>console.log(row))
      //.on('result', row =>console.log('id Personal Data : '+ idCustomer))
      //.on('end', () => res.send(200));
  }).catch(error => console.error(error));
  res.send('respond with a resource');
  } 
 });


/*********************************************************************************/
 /*********************** PUT users listing. ************************************/
app.put('/:id', function(req, res, next) {

  console.log('dentro de PUT');
  let id = req.param.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let document_number = req.body.document_number;
  let country = req.body.country;

  const data = [];

  mySqlConnectionFactory({ }).then(connection => {
    const query =  'UPDATE personal_data (first_name, last_name, document_number, country) SET value = (?,?,?,?) WHERE id = ?';
    connection.query(query, [id, first_name, last_name, document_number, country])
      .on('error', error => res.render('error', { title: 'Express', error }))
      .on('result', row =>console.log(row))
      //.on('end', () => res.send(200));
  }).catch(error => console.error(error));
  

res.send('respond with a resource');

 });



 

 

 /************************** DELETE users listing. ****************************/
app.delete('/:id', function(req, res, next) {

  let id = req.params.id;
  
  const data = [];

  mySqlConnectionFactory({ }).then(connection => {
    const query = 'DELETE * FROM personal_data WHERE id=?';
    connection.query(query, [id])
      .on('error', error => res.render('error', { title: 'Express', error }))
      .on('result', row =>console.log(row))
      //.on('end', () => res.send(200));
  }).catch(error => console.error(error));
  

  res.send('respond with a resource');

 });



export default app;

