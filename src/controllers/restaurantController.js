const mongo = require('../database')

exports.addRestaurant = (req, res, next) => {
    let name = req.body.name;
    let address = req.body.address;
    let image = req.body.image;
    let phone = req.body.phoen;
    let description = req.body.description;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let Restaurant = {'name': name, 'address': address, 'image': image ,'phone': phone, 'description': description};
        collection.insertOne(Restaurant);
        res.status(201).send('Restaurante adicionado com sucesso!');
    });
};

exports.getAllRestaurants = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Restaurant');
        let query = {};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });
};

exports.getALlMealsFromTheRestaurant = (req, res, next) => {
    let id = req.params.restaurantId
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let query = {'restaurantId': id};
        collection.find(query).toArray(await function (err, docs){
            res.status(201).send(docs);
        })
    });    
};