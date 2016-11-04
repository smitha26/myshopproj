import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';
let router = express.Router();


router.get('/logout', function(request, response){
    request.session.destroy ();
    //request.session = null;
    response.redirect ('/login');
});
export default router;
