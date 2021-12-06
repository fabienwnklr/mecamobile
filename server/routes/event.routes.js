const { verifyToken } = require('../middleware/authJwt');

module.exports = app => {
    const event = require('../controllers/event.controller.js');
    const router = require('express').Router();

    router.get('/', event.getAllEvents);

    router.get('/:id', event.getEventById);

    router.put('/:id', event.updateEvent);

    router.post('/', verifyToken, event.addEvent);

    router.delete('/:id', verifyToken, event.delete);

    app.use('/api/event', router);
};
