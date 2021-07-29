const { verifyToken } = require('../middleware/authJwt.js')

module.exports = app => {
    const user = require('../controllers/user.controller.js');
    const router = require('express').Router();

    router.get('/:id', verifyToken, user.getUser);

    router.get('/', verifyToken, user.getUsers);

    router.get('/:username', user.getUserByUsername);

    router.put('/:id', verifyToken, user.update)

    router.post('/login', user.login);

    router.post('/register', user.register);

    app.use('/api/user', router);
}