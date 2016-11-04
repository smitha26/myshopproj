import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();


// router.get('/bob', function(req, res) {
//     res.json ({ name: 'bob' });
// });

router.post('/', function(req, res) {
    console.log('--------');
    console.log('form data: ',req.body);
    database.db.collection('users').save(req.body,function(error,result){

        if (error != null){
            res.redirect('/error');
        }else{
            console.log('take me to profile');
            res.json ({});
            // res.redirect ('/home')
            // res.render('home.ejs', {
            //     message:'Signup was successfull. Please login to your account '
            // });
            
        }
    });

});
//Get All Products
router.get('/', (req, res) => {
  database.db.collection('users').find().toArray().then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  })
});

export default router;
