const mongodb = require('../data/database');

//This is the unique objectId that the Mongo
//assigns to all its databas entries. Like the PrimaryKey
const ObjectId = require('mongodb').ObjectId;


//Let's call the databse asynchrn. and gonna pass in
//a req and res object, which all our express middleware
//passes that through.
const getAll = async (req, res) => {

    try{
        //get database instance
        const database = mongodb.getDatabase();
        //declare a variable that connects to the database,
        //accessing the collection from db
        const result = await database.db().collection('contact').find();
        result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    });
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    }
    
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contact').find({ _id:userId });
    result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]);
    });
};

module.exports = {
    getAll,
    getSingle
};