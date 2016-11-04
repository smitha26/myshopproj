import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();

// app.get('/cart/add/:id', function(request, response){
// console.log('Item added by id: ' + request.params.id);
// var objectId = request.params.id;

// router.get ('/', function (request, response) {
//     response.json ({
//         message: 'This is a test route for the cart.'
//     });
// });

router.post ('/', function (request, response) {
    let cart = request.session.cart;
    let product = request.body;
    let objectId = request.params.id;
    console.log(request.body);

        if (!cart) {
            cart= {
                total:0,
                itemList:[]
            };
            //Save the cart to the session
            request.session.cart = cart;
        }
        //Add the product to the cart session
        cart.itemList.push (product);
        //Add price to total
        cart.total = cart.total + product.price;
        console.log('This is server cart session: ', cart);
    response.json ({
        product: request.body,
        message: 'This is a test route for the cart.'
    });
    // response.redirect('/cart');
});

router.get('/', function(request, response){
    // - Get the cart out of the session.
    // - Grab the cart items.
    // - Send back those items as a response in json format.
    console.log("Inside the cart get method");
        // try {
    let i = 0;
    let name;
    let price;

    let cart = request.session.cart;
    // let items = cart.itemList;
    // console.log("Inside the cart get method end");
    // // let total = cart.total;
    // console.log("Inside the cart get method end");
    // // let itemName = cart.itemList[0].name;
    //  console.log("items: ", cart.itemList)
    // // console.log("this is items ", itemName);
    // console.log("this is items ", cart);
    // console.log("this is total ", total);
    // console.log("this is itemlist_len" , cart.itemList.length);
    // let name0 = cart.itemList[0].name;
    // let price0 = cart.itemList[0].price;

    response.json ([cart]);
});
    // catch (error) {
    //     console.log ('- Error here: ', error);
    //     throw error;
    // }

    // console.log("this is name and price  ", name0, price0);
    //  cart.itemList.push({
    //     name: 'Cart total',
    //     price: cart.total,
    //      total: cart.total
    //  });
    //  console.log("this is itemlist" , cart.itemList);
    // response.json(cart.itemList);
    //  response.json(cart);

    // console.log("this is items ", total);
    // response.json ({cart.itemList});
    // response.json({
    //     data: {
    //         redirect: 'error',
    //         message: 'Username and Login was not correct.'
    //     }
    // });


    // response.render('cart.html', {cart:cart});

router.get('/clearcart', function(request, response){
    request.session.destroy ();
    //request.session = null;
    // response.redirect ('/cart');
});

// Delete product
router.delete('/:id', (req, res) => {
    console.log('remove item by id: ' , req.params.id);
    let cart = req.session.cart;
    console.log("this is cart before delete  " , cart);
    if (cart){
        console.log("I am here");
        let index = req.params.id;
        console.log("this is going to be removed ", index);
        let price = cart.itemList[index].price;
        console.log("Price: ", price)


        let  removeditem = cart.itemList.splice(index, 1);
        console.log('removeditem: ', removeditem);
        console.log("this is cart after delete  " , cart);
        //  res.redirect('/cart');
         cart.total = cart.total - price;

         console.log('cart total: ' ,cart.total);
         req.session.cart = cart;
         console.log("Cart after delete ", cart);
        //  res.json ({cart.itemList});
         res.json (cart);
         // res.json({
         //     data: {
         //         redirect: 'error',
         //         message: 'Username and Login was not correct.'
         //     }
         // });


    }
    // res.sendStatus(200);
  });



export default router;

// db.collection('products').findOne (
//     {
//         name: objectId
//     },
//     {},
//
//     function(error, resultList){
//         if (error) {
//             throw error;
//             response.redirect('/error');
//         }
//         //check if we have a shopping cart in the session
//         var cart = request.session.cart;
//         //if no cart exsist, create new cart
//         if (!cart){
//             cart = {
//                 total:0,
//                 itemList: []
//             };
//             request.session.cart = cart;
//         }
//
//         //Grab the item from the result list
//         var item = resultList;
// }
