const mongo = require('../database');
var ObjectId = require('mongodb').ObjectID;

exports.addRestaurant = (req, res, next) => {
    let restaurant_name = req.body.name;
    let restaurant_address = req.body.address;
    let restaurant_image_url = req.body.image_url;
    let restaurant_phone = req.body.phone;
    let restaurant_description = req.body.description;
    let restaurant_distance = req.body.distance;
    let restaurant_category = req.body.category;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let Restaurant = {
            name: restaurant_name, 
            address: restaurant_address, 
            image_url: restaurant_image_url,
            phone: restaurant_phone, 
            description: restaurant_description, 
            distance: restaurant_distance, 
            category: restaurant_category
        };
        collection.insertOne(Restaurant);
        res.status(201).send('Restaurante adicionado com sucesso!');
    });
};

exports.addRestaurants = (req, res, next) => {
    let restaurants = req.body.restaurants;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        restaurants = await collection.insert(restaurants);
        res.status(201).send(restaurants.ops);
    });
};

exports.updateRestaurant = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {"_id": ObjectId(id)};
        collection.updateOne(
            query,
            {$set:
                req.body
            }
        )
        res.status(200).send('Restaurante atualizado com sucesso!');
    });
};

exports.getAllRestaurants = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {};
        let restaurants = await collection.find(query).toArray();
        res.status(200).send(restaurants);
    });
};

exports.getShuffleRestaurants = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {};
        let restaurants = await collection.find(query).toArray();
        restaurants.sort(function() {return .5 - Math.random();});
        res.status(200).send(restaurants);
    });
};

exports.getRestaurant = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {"_id": ObjectId(id)};
        let restaurant = await collection.findOne(query);
        res.status(200).send(restaurant);
    });
};

exports.getAllMealsFromRestaurant = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Meal');
        let query = {'restaurant_id': ObjectId(id)};
        let meals = await collection.find(query).toArray();
        res.status(200).send(meals);
    });    
};

exports.getAllOrdersFromRestaurant = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let query = {'restaurant_id': ObjectId(id)};
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });    
};

exports.getOrdersByStatus = (req, res, next) => {
    let id = req.params.id;
    let order_status = req.params.status;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let query = {
            'restaurant_id': ObjectId(id),
            'status': {'$eq': order_status}
        };
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });
};

exports.getAllOrdersFromRestaurantWithoutOneStatus = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Order');
        let query = {
            'restaurant_id': ObjectId(id),
            'status': {'$ne': 'Pedindo'}
        };
        let orders = await collection.find(query).toArray();
        res.status(200).send(orders);
    });    
};

exports.addCheckout = (req, res, next) => {
    let restaurant_id = req.body.restaurant_id;
    let from = req.body.from;
    let to = req.body.to;
    let multiplier = req.body.multiplier || 1;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('RestaurantCheckout');
        let checkout_obj = {
            "restaurant_id": ObjectId(restaurant_id),
            "from": from,
            "to": to,
            "multiplier": multiplier, 
        };
        checkout = await collection.insert(checkout_obj);
        res.status(201).send(checkout.ops[0]._id);
    });
};

exports.getRestaurantCheckouts = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('RestaurantCheckout');
        let query = {"restaurant_id": ObjectId(id)};
        checkouts = await collection.find(query).toArray();
        res.status(200).send(checkouts);
    });
};

exports.deleteCheckout = (req, res, next) => {
    let id = req.params.id;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('RestaurantCheckout');
        let query = {"_id": ObjectId(id)};
        await collection.deleteOne(query);
        res.status(200).send("Checkout deletado com sucesso");
    });
};
