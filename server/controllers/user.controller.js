const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;

    if (!username || !pass) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    User.findOne({ where: { username } })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: 'Utilisateur introuvable'
                });
                return;
            }
            const userFind = data.dataValues;

            if (bcrypt.compareSync(pass, userFind.password)) {
                const userLogged = {
                    id: userFind.id,
                    username: userFind.username,
                    email: userFind.email
                };

                jwt.sign({ user: userLogged }, 'secretkey', { expiresIn: '7d' }, (err, token) => {
                    if (err) res.json(err);
                    res.status(200).send({ token: token, user: userLogged });
                });
            } else {
                res.status(403).send({
                    message: 'Mot de passe ou email incorrect.'
                });
            }
        })
        .catch(err =>
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur de connexion.'
            })
        );
};

exports.register = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    const createdUser = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 15)
    };

    User.create(createdUser)
        .then(() => {
            this.login(req, res);
        })
        .catch(error => {
            res.status(500).send({
                errorThrow: error,
                message: `Une erreur est survenue lors de la création de l'utilisateur.`
            });
        });
};

exports.getUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
        attributes: ['username', 'id', 'email', 'createdAt', 'updatedAt']
    })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: 'Utilisateur inexistant.'
                });
                return;
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                errorThrow: err,
                message: `Erreur de récupération de l'utilisateur pour id = ${id}`
            });
        });
};

exports.getUsers = (req, res) => {
    User.findAll({ attributes: ['username', 'id', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'] })
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            console.error(err);
        });
};

exports.getUserByUsername = (req, res) => {
    const username = req.body.username;

    if (!username) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    User.findOne({ where: { username } })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: 'Utilisateur introuvable'
                });
                return;
            }

            res.status(200).send(data.dataValues);
            return;
        })
        .catch(err =>
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur de connexion.'
            })
        );
};

exports.update = (req, res) => {
    const id = req.params.id;
    const values = req.body;
    values.updatedAt = +new Date();

    if (req.body.password && req.body.password !== '') {
        values.password = bcrypt.hashSync(req.body.password, 15);
    }

    User.update(values, {
        where: { id: id }
    })
        .then(num => {
            if (num) {
                if (values.password) delete values.password;

                res.status(200).send({
                    values,
                    message: 'Modification(s) enregistrée(s)'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                errorThrow: err,
                message: `Erreur lors de la modification`
            });
        });
};
