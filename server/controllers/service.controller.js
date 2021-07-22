const db = require('../models');
const Service = db.service;

exports.getAllServices = (req, res) => {
    Service.findAll({ where: { status: 'online' } })
        .then(data => {
            res.send(data).status(200)
        })
        .catch(err =>
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur lors de la récupération des services.'
            })
        )
}

exports.getServiceById = (req, res) => {
    const id = req.params.id;

    Service.findByPk(id).then(data =>
        res.send(data)
    ).catch(err => res.status(500).send({
        errorThrow: err.message,
        message: 'Erreur lors de la récupération du service.'
    }))
}