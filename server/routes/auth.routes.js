module.exports = app => {
    const auth = require('../controllers/auth.controller.js');
    const router = require('express').Router();

    router.get('/:id', auth.getUser);

    router.post('/login', auth.login);

    app.use('/api/auth', router);
}