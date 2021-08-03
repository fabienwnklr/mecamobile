const { verifyToken } = require('../middleware/authJwt');

module.exports = app => {
    const service = require('../controllers/service.controller.js');
    const router = require('express').Router();

    router.get('/', service.getServicesHomePage);

    router.get('/full', service.getServicesFull);

    router.get('/admin', verifyToken, service.getAllServices);

    router.get('/:id', service.getServiceById);

    // router.get('/', service.getServiceByLinkName);

    router.put('/:id', service.updateService)

    router.post('/', verifyToken, service.addService);

    router.delete('/:id', verifyToken, service.delete);

    app.use('/api/service', router);
}