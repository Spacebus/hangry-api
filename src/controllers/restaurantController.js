const mongo = require('../database')

exports.addRestaurant = (req, res, next) => {
    let name = req.body.name;
    let address = req.body.address;
    let imageURL = req.body.imageURL;
    let phone = req.body.phoen;
    let description = req.body.description;
    let distance = req.body.distance;
    let category = req.body.category;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let Restaurant = {'name': name, 'address': address, 'imageURL': imageURL ,'phone': phone, 'description': description, 'distance': distance, 'category': category};
        collection.insertOne(Restaurant);
        res.status(201).send('Restaurante adicionado com sucesso!');
    });
};

exports.updateRestaurant = (req, res, next) => {
    let id = req.params.restaurantId;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Restaurant');
        let query = {'restaurantId': id};
        let obj = req.body;
        collection.update(
            query,
            {
                    $set: obj
            }
        );
        res.status(201).send('Restaurante atualizado com sucesso!');
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

exports.getAllMealsFromTheRestaurant = (req, res, next) => {
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
