const mongo = require('../database')
var ObjectId = require('mongodb').ObjectID;

exports.addMeal = (req, res, next) => {
    let meal_restaurant_id = req.body.restaurant_id;
    let meal_name = req.body.name;
    let meal_price = req.body.price;
    let meal_description = req.body.description;
    let meal_type = req.body.type;
    let meal_image_url = req.body.image;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Meal');
        let Meal = {
            restaurant_id: ObjectId(meal_restaurant_id),
            name: meal_name, 
            price: meal_price, 
            description: meal_description, 
            type: meal_type,
            image_url: meal_image_url
        };
        collection.insertOne(Meal);
        res.status(201).send('Refeição adicionada com sucesso!');
    });
};

exports.updateMeal = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let query = {"_id": ObjectId(id)};
        collection.updateOne(
            query,
            {$set:
                req.body
            }
        )
        res.status(200).send('Refeição alterada com sucesso!');
    });
};

exports.getAllMeals = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let query = {};
        let meals = await collection.find(query).toArray();
        res.status(200).send(meals);
    });
};