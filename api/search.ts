import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();




router.get('/', (req, res) => {
    console.log("In service.ts file")
  database.db.collection('categories').find().toArray().then((category) => {
    res.json([category]);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  })
});



export default router;
