const { verifyToken } = require('../middleware/authJwt');

module.exports = app => {
    const service = require('../controllers/service.controller.js');
    const router = require('express').Router();

    router.get('/', service.getAllActifServices);

    router.get('/admin', verifyToken, service.getAllServices);

    router.get('/:id', service.getServiceById);

    router.put('/:id', service.updateService)

    router.post('/', verifyToken, service.addService);

    app.use('/api/service', router);
}