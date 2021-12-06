const db = require('../models');
const { Op } = require('sequelize');
const Event = db.event;

exports.getAllEvents = (req, res) => {
    console.log(req.query);
    Event.findAll({
        where: {
            start: {
                [Op.between]: [req.query.start, req.query.end]
            }
        }
    })
        .then(events => {
            res.send(events).status(200);
        })
        .catch(err =>
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur lors de la récupération des events.'
            })
        );
};

exports.getEventById = (req, res) => {
    const id = req.params.id;

    if (isNaN(parseInt(id, 10))) {
        this.getEventByLinkName(req, res);
        return;
    }

    Event.findByPk(id)
        .then(event => {
            res.send(event);
        })
        .catch(err =>
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur lors de la récupération du event.'
            })
        );
};

exports.addEvent = (req, res) => {
    const newEvent = {
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        color: req.body.color,
        description: req.body.description,
        createdBy: req.body.creator
    };

    Event.create(newEvent)
        .then(data => {
            Event.findByPk(data.id).then(eventAdded => {
                res.status(200).send({
                    message: 'Event créé !',
                    data: eventAdded
                });
            });
        })
        .catch(error =>
            res.status(500).send({
                errorThrow: error,
                message: 'Erreur lors de la création du event'
            })
        );
};

exports.updateEvent = (req, res) => {
    const id = req.params.id;
    const values = req.body;

    // on créer l'ancre par rapport au nom du event
    const link = values.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(' ', '_')
        .toLowerCase();

    values.link = link;
    values.updatedAt = +new Date();

    if (!values.icon.startsWith('mdi-')) {
        values.icon = 'mdi-' + req.body.icon;
    }

    Event.update(values, {
        where: { id: id }
    })
        .then(num => {
            console.log(num);
            if (num) {
                res.status(200).send({
                    values,
                    message: 'Modification(s) sauvegardée(s).'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                errorThrow: err,
                message: `Une erreur est survenue lors de la modification du event ${values.name}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Event.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: 'Event removed'
                });
            } else {
                res.send({
                    message: `Could not delete Event with id = ${id}, maybe already removed`
                });
            }
        })
        .catch(err => {
            res.status(401).send({
                errorThrow: err,
                message: `Could not delete Event with id = ${id}`
            });
        });
};

exports.deleteAll = (req, res) => {
    Event.destroy({
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(401).send({
                errorThrow: err,
                message: 'Some error occurred while removing all tutorials.'
            });
        });
};
