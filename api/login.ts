import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();


router.get('/', function(request, response){
    console.log("logout route")
    request.session.destroy ();
    //request.session = null;
    //response.redirect ('/login');
});

router.post('/', function(req, res) {
    console.log('In Login Post')
    console.log('form data: ',req.body);
    //var cursor =
    database.db.collection('users').findOne(
        {
            username: req.body.username,
            password: req.body.password
            // password: request.body.password
        },
        function(error, dbResult){
            console.log('database result:', dbResult);

            // Check for an error or no dbResult.
            if (error != null || dbResult == null) {
                // Send back json data that has the route to redirect to.
                res.json({
                    data: {
                        redirect: 'error',
                        message: 'Username and Login was not correct.'
                    }
                })
                // return;
            }else{
                req.session.user = dbResult;
                if (dbResult.admin){
                // Send back the user data.
                res.json ({
                    data: {
                        redirect: 'admin',
                        user: dbResult
                    }
                });
            }else{
                res.json ({
                    data: {
                        redirect: 'profile',
                        user: dbResult
                    }
                });
            }
            }
});
});

// router.post('/', function(req, res) {
//     console.log('In Login Post')
//     console.log('form data: ',req.body);
//     //var cursor =
//     database.db.collection('users').findOne(
//         {
//             username: req.body.username,
//             password: req.body.password
//             // password: request.body.password
//         },
//         function(error, user){
//             console.log('database result:', user);
//
//             // Check for an error or no dbResult.
//             if (error != null || user == null) {
//                 // Send back json data that has the route to redirect to.
//                 res.json({
//                     data: {
//                         redirect: 'error',
//                         message: 'Username and Login was not correct.'
//                     }
//                 })
//                 // ;return;
//             } else
//             {
//                 req.session.user = user;
//                 if (user.admin) {
//                     res.json ({
//                         data: {
//                             redirect: 'admin',
//                             user: user
//                         }
//
//                     }
//                 }else{
//                     res.json ({
//                         data: {
//                             redirect: 'profile',
//                             user: user
//                         }
//                     }
//                 }
//             }
//         });
//
//     });

            // if (!user){
            //     res.redirect('/error');
            // }else
            // {
            //     req.session.user = user;
            //     console.log('session: ', req.session);
            //     res.json({
            //         redirect:'profile'
            //     });
            //     // if (user.admin) {
            //     //     res.redirect ('/admin');
            //     // }else {
            //     //     res.redirect('/profile')
            //     // }
            //     // console.log('user: ', user);
            // }




    export default router;
