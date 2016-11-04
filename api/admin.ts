import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();

//Get All Products
router.get('/', (req, res) => {
  database.db.collection('shopproducts').find().toArray().then((shopproducts) => {
    res.json(shopproducts);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  })
});
//Get All Products
// router.get('/', (req, res) => {
//   database.db.collection('shopproducts').find().toArray().then((shopproducts) => {
//     res.json(shopproducts);
//   }).catch((err) => {
//     res.status(500);
//     console.error(err);
//   })
// });

//Get Single Product By ID
router.get('/:id', (req, res) => {
  let productId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('shopproducts').findOne(productId).then((shopproducts) => {
    res.json(shopproducts);
  });
});
//Create new products
router.post('/', (req, res) => {
  let product = req.body;
  product._id = new mongodb.ObjectID(product._id);
  database.db.collection('shopproducts').save(product).then((newProduct) => {
    res.json(newProduct);
  })
});

// Delete product by Id
router.delete('/:id', (req, res) => {
  let productId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('shopproducts').remove({_id:productId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});
export default router;
