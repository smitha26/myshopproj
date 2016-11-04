import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();



router.get ('/', function (req, res) {
    database.db.collection('products').find().toArray().then((products)=>{
        res.json(products);
    })

});

export default router;
