const db = require('../models');
const Service = db.service;

exports.getAllServices = (req, res) => {
    Service.findAll()
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

exports.getServicesHomePage = (req, res) => {
    Service.findAll({ attributes: ['name', 'icon', 'link'], where: { online: '1' } })
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

exports.getServicesFull = (req, res) => {
    Service.findAll({ attributes: ['name', 'icon', 'description', 'link'], where: { online: '1' } })
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

    if (isNaN(parseInt(id, 10))) {
        this.getServiceByLinkName(req, res);
        return;
    }

    Service.findByPk(id).then(data =>
        res.send(data)
    ).catch(err => res.status(500).send({
        errorThrow: err.message,
        message: 'Erreur lors de la récupération du service.'
    }))
}

exports.getServiceByLinkName = (req, res) => {
    const link = req.params.id;

    Service.findOne({ where: { link: link } }).then(data =>
        res.send(data)
    ).catch(err => res.status(500).send({
        errorThrow: err.message,
        message: 'Erreur lors de la récupération du service.'
    }))
}

exports.addService = (req, res) => {
    // on créer l'ancre par rapport au nom du service
    const link = req.body.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(' ', '_').toLowerCase();

    const newService = {
        icon: 'mdi-' + req.body.icon,
        name: req.body.name,
        status: req.body.status,
        description: req.body.description,
        createdBy: req.body.creator,
        link
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

exports.updateService = (req, res) => {
    const id = req.params.id;
    const values = req.body;

    // on créer l'ancre par rapport au nom du service
    const link = values.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(' ', '_').toLowerCase();

    console.log(link);

    values.link = link;
    values.updatedAt = +new Date();

    if (!values.icon.startsWith('mdi-')) {
        values.icon = 'mdi-' + req.body.icon;
    }

    Service.update(values, {
        where: { id: id },
    })
        .then((num) => {
            console.log(num);
            if (num) {
                res.status(200).send({
                    values,
                    message: "Modification(s) sauvegardée(s).",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                errorThrow: err,
                message: `Une erreur est survenue lors de la modification du service ${values.name}`,
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