const mongodb = require('../data/database');
//This is the unique objectId that the Mongo
//assigns to all its databas entries. Like the PrimaryKey
const ObjectId = require('mongodb').ObjectId;


//Let's call the databse asynchrn. and gonna pass in
//a req and res object, which all our express middleware
//passes that through.
const getAll = async (req, res) => {

    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to get all contacts'
    /* #swagger.responses[200] = {
        description: 'Contacts successfully obtained',
        schema: { $ref: '#/definitions/ContactResponse' }
    } */

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

    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to get a single contact by ID'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'Contact successfully obtained',
        schema: { $ref: '#/definitions/ContactResponse' }
    } */
    /* #swagger.responses[404] = {
        description: 'Contact not found'
    } */

    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contact').find({ _id:userId });
        result.toArray().then((contact) => {
        if (contact.length === 0) {
            return res.status(404).json({message: 'COntact not found'});
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]);
    });
    } catch (error) {
        console.error('Error in GetSingle:', error);
        res.status(500).json({message: 'Error retrieving contact', error: error.message});
    }
    
};


const createContact = async (req, res) => {
     // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to create a new contact'
    /* #swagger.parameters['contact'] = {
        in: 'body',
        description: 'Contact information',
        required: true,
        schema: { $ref: '#/definitions/Contact' }
    } */
    /* #swagger.responses[201] = {
        description: 'Contact successfully created',
        schema: { $ref: '#/definitions/NewContactID' }
    } */
    /* #swagger.responses[400] = {
        description: 'Missing required fields'
    } */

    try {
        const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Missing field: ${field}`});
            }
        }

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase().db().collection('contact').insertOne(contact);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId});
        } else {
            res.status(500).json({ message: 'Error creating contact'});
        }
    } catch (error) {
        console.error('Error in createContact:', error);
        res.status(500).json({ message: 'Error creating contact', error: error.message});
    }
};


const updateContact = async (req, res) => {
     // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to update a contact'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.parameters['contact'] = {
        in: 'body',
        description: 'Updated contact information',
        required: true,
        schema: { $ref: '#/definitions/Contact' }
    } */
    /* #swagger.responses[204] = {
        description: 'Contact successfully updated'
    } */
    /* #swagger.responses[400] = {
        description: 'Missing required fields'
    } */
    /* #swagger.responses[404] = {
        description: 'Contact not found'
    } */

    try {
        const userId = new ObjectId(req.params.id);
        const fields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

        for (const field of fields) {
            if (!req.body[field]) {
                return res.status(400).json({message: `Missing field: ${field}`});
            }
        }

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase().db().collection('contact').replaceOne({ _id: userId}, contact);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found or no changes made'});
        }


    } catch (error) {
        console.error('Error in updateContact:', error);
        res.status(500).json({ message: 'Error updating contact', error: error.message});
    }
}; 

const deleteContact = async (req, res) => {

    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Endpoint to delete a contact'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[204] = {
        description: 'Contact successfully deleted'
    } */
    /* #swagger.responses[404] = {
        description: 'Contact not found'
    } */

    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('contact').deleteOne({ _id: userId});
        
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Contact not found'});
        }
    } catch (error) {
        console.error ('Error in deleteContact:', error);
        res.status(500).json({ message: 'Error deleting contact', error: error.message});
    }
};



module.exports = {
    getAll,
    getSingle, 
    createContact,
    updateContact,
    deleteContact
};