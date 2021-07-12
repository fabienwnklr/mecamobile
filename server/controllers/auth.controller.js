const db = require('../models');
const User = db.user;
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    if (!email || !pass) {
        res.status(400).json({
            message: 'Veuillez remplir tous les champs.'
        });
        return;
    }

    User.findOne({ where: { email: email } })
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
                    is_admin: userFind.is_admin
                }
                jwt.sign({ user: userLogged }, 'secretkey', { expiresIn: '7d' }, (err, token) => {
                    if (err) res.json(err)
                    res.send({ auth: true, token: token, user: userLogged }).status(200)
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