const mongo = require('../database')

exports.addMeal = (req, res, next) => {
    let restaurantId = req.body.restaurantId;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let imageURL = req.body.image;
    let multiplier = parseInt(req.body.multiplier) || 1;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Meal');
        let Meal = {'restaurantId': restaurantId,'name': name, 'price': price, 'description': description, 'imageURL': imageURL, 'multiplier': multiplier};
        collection.insertOne(Meal);
        res.status(201).send('Refeição adicionada com sucesso!');
    });
};

exports.updateMeal = (req, res, next) => {
    let id = req.params.mealId;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let query = {'mealId': id};
        collection.updateOne(
            query,
            {$set:
                req.body
            }
        )
        res.status(201).send('Refeição alterada com sucesso!');
    });
};

exports.updateAllMeals = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let collection = await db.collection('Meal');
        let multiplier = req.body.multiplier;
        collection.updateMany(
            {},
            {$set: {
                'multiplier': multiplier
            }}
        )
        res.status(201).send('Refeições alteradas com sucesso!');
    });
};