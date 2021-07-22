module.exports = app => {
    const service = require('../controllers/service.controller.js');
    const router = require('express').Router();

    router.get('/', service.getAllServices);
    router.get('/:id', service.getServiceById);

    app.use('/api/service', router);
}