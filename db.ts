const connectionString:string = 'mongodb://smithaG:sgki2345@ds063536.mlab.com:63536/shopproducts';


import * as mongodb from 'mongodb';

export default class Database {
  public static db:mongodb.Db;

  public static connect() {
    return mongodb.MongoClient.connect(connectionString).then((db) => {
        this.db = db;
    }).catch((err) => {
        console.error(err);
    });
  }
}
