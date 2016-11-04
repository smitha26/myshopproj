import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
//import * as session from 'express-session';
import routes from './routes/index';
import users from './routes/users';
import Database from './db';
import shopproducts from './api/shopproducts';
import admin from './api/admin';

let app = express();

let session = require('express-session');

app.use(session({
    secret: 'keyboard cat', //used to salt the hash
    //keep the session
    resave: false,
    saveUninitialized: true
}));

//open database connection
// Database.connect().then(() => {
//   // drop everything
//   Database.db.dropDatabase().then(() => {
//     // seed with new products
//     Database.db.collection('products').insert([
//       {name:'Apples', price: 9.33},
//       {name:'Milk', price: 2.00},
//       {name:'Cheese', price: 4.55}
//     ]);
//   });
// })


// open database connection
Database.connect().then(() => {
    // drop everything
    Database.db.dropDatabase().then(() => {
        // seed with new products
        Database.db.collection('shopproducts').insert([
            {
                image: 'https://s-media-cache-ak0.pinimg.com/originals/15/a5/3c/15a53c2ea7a55218eccf474be4674270.jpg',
                style: 'Party Dress',
                color:'red',
                categoryId:'#1234',
                price: 150
            },{
                image:'http://weknowyourdreams.com/images/dress/dress-02.jpg',
                style: 'Party Dress',
                color:'pink',
                categoryId:'#1234',
                price: 99
            },{
                image:'https://a2ua.com/dress/dress-027.jpg',
                style: 'Summer Dress',
                color:'blue',
                categoryId:'#5678',
                price: 68
            },
            {
                image:'https://s-media-cache-ak0.pinimg.com/236x/d3/52/59/d35259d14e851f5e30a096104744230f.jpg',
                style: 'Summer Dress',
                color:'green',
                categoryId:'#5678',
                price: 125
            }
        ]);

        Database.db.collection('users').insert([
            {
                username:'smitha',
                password: 'gopalan',
                admin:'true'
            },{
                username:'mike',
                password: 'test'

            }
        ]);

        //Create a collection for category
        //to create one to many relationship
        Database.db.collection('categories').insert([
            {
                _id:'#1234',
                style:'Party Dress'
            },{
                _id:'#5678',
                style:'Summer Dress'

            }
        ]);
    });
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/shopproducts', shopproducts);
app.use('/api/admin', admin);

import search from './api/search';
app.use('/api/search', search);

import signup from './api/signup';
app.use('/api/signup', signup);

import login from './api/login';
app.use('/api/login', login);

import cart from './api/cart';
app.use('/api/cart', cart);

import products from './api/products';
app.use('/api/products', products);

// /api/signup/
// /api/signup/bob

// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



// app.get('/profile', function(req, res) {
//     let user = req.session.user;
//     console.log(app.get('user'));
//     res.render('profile.ejs', {user: user});
//     res.redirect('profile.ejs');
// });
// app.get('/aftersignuplogin', function(req, res) {
//     res.redirect('aftersignuplogin.ejs');
// });
export = app;
