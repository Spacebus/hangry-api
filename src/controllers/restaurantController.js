const db = require('../database')
exports.get_all_restaurants = (req, res, next) => {
    db.collections('Restaurant');
    res.status(201).send('Requisição recebida com sucesso!');
};