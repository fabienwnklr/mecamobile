const db = require('../models');
const User = db.user;
// const bcrypt = require('bcrypt');
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
            if (pass === userFind.password) {
                const userLogged = {
                    id: userFind.id,
                    username: userFind.username,
                    email: userFind.email,
                };

                jwt.sign({ user: userLogged }, 'secretkey', { expiresIn: '7d' }, (err, token) => {
                    if (err) res.json(err)
                    res.status(200).send({ token: token, user: userLogged });
                })
            } else {
                res.status(403).send({
                    message: 'Mot de passe ou email incorrect.'
                })
            }
        })
        .catch(err =>
            res.status(500).send({
                errorThrow: err.message,
                message: 'Erreur de connexion.'
            })
        )
}

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
}