import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();

//GET products
// router.get('/', (req, res) => {
//   database.db.collection('shopproducts').find().toArray().then((shopproducts)=>{
//     res.json(shopproducts);
//   })
// });
// router.post('/shopnow', function(request, response) {
//     console.log('--------')
//     console.log('form data: ',request.body);
//
//     database.db.collection('users').save(request.body,function(error,result){
//         if (error == null){
//             response.redirect('/error')
//         }else{
//             response.redirect('/profile');
//         }
//     });
//
// });

//Get All Products
router.get('/', (req, res) => {
    let categoryId = req.query.categoryId;
    let filter = {};

    // Set up the filter object if a category id was passed down.
    if (categoryId && categoryId.length > 1) {
        filter = {
            categoryId: categoryId
        }
    }

    console.log("this is findByCategory endpoint: ", categoryId);
    database.db.collection('shopproducts').find(filter).toArray().then((shopproducts) => {
        res.json(shopproducts);
    }).catch((err) => {
        res.status(500);
        console.error(err);
    })
});

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



//////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
export default router;
