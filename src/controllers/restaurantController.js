const mongo = require('../database')
exports.get_all_restaurants = (req, res, next) => {
    mongo.connect(async function(err){
        if (err) throw err;
        let db = mongo.conn.db('hangry-test')
        let restaurants = await db.collection('Restaurant').findOne();
        res.status(201).send(restaurants);
    });
};