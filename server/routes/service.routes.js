module.exports = app => {
    const service = require('../controllers/service.controller.js');
    const router = require('express').Router();

    router.get('/all', service.getAllServices);
    router.get('/one:id', service.getServiceById);

    app.use('/api/service', router);
}