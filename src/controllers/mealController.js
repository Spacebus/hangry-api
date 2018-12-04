const mongo = require('../database')

exports.addMeal = (req, res, next) => {
    let restaurantId = req.body.restaurantId;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let imageURL = req.body.image;
    let multiplier = req.body.multiplier || 1;
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test');
        let collection = await db.collection('Meal');
        let Meal = {'restaurantId': restaurantId,'name': name, 'price': price, 'description': description, 'imageURL': imageURL, 'multiplier': multiplier};
        collection.insertOne(Meal);
        res.status(201).send('Refeição adicionada com sucesso!');
    });
};