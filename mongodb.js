"use strict";
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURl = 'mongodb://127.0.0.1:27017';
const databaseName = 'inventory-manager';
MongoClient.connect(connectionURl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);
    /* db.collection('vendors').insertOne({
         name:'Mark',
         email: 'Mark@gmail.com'
     },(error: any, result: any) => {
         if(error){
             return console.log('Unable to insert vendor.')
         }
     console.log(result.ops)
    
 })*/
    db.collection('items').deleteOne({ _id: new mongodb.ObjectID('630c9cdcac4274f1d7d9d6e8') });
    /*db.collection('categories').insertMany([
    {
        name: 'Toys'
    },
    {
        name: 'Food'
    }
    ]
    ,(error: any, result: any) => {
        if(error){
            return console.log('Unable to insert category.')
        }
    console.log(result.ops)
    
    })*/
    db.collection('items').insertOne({
        name: 'Water',
        quantity: 200,
        pricePerItem: 1.0
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert category.');
        }
        console.log(result.ops);
    });
});
