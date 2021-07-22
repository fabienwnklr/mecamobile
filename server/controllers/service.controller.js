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

exports.addService = (req, res) => {
    const newService = {
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
    };

    Service.create(newService).then(data => {
        Service.findByPk(data.id).then(serviceAdded => {
            res.status(200).send({
                message: 'Service créé !',
                data: serviceAdded
            })
        })
    }).catch(error => res.status(500).send({
        errorThrow: error,
        message: 'Erreur lors de la création du service'
    }))
}

exports.update = (req, res) => {
    const id = req.params.id;
    const values = req.body;

    Service.update(values, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num) {
                res.status(200).send({
                    values,
                    message: "Saved change(s)",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                errorThrow: err,
                message: `An error occured during the modification(s)`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Service.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: "Service removed",
                });
            } else {
                res.send({
                    message: `Could not delete Service with id = ${id}, maybe already removed`,
                });
            }
        })
        .catch((err) => {
            res.status(401).send({
                errorThrow: err,
                message: `Could not delete Service with id = ${id}`,
            });
        });
};

exports.deleteAll = (req, res) => {
    Service.destroy({
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch((err) => {
            res.status(401).send({
                errorThrow: err,
                message: "Some error occurred while removing all tutorials.",
            });
        });
};