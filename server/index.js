require('dotenv').config();

import express, { urlencoded, json } from 'express';
import { verifyToken } from './middleware/authJwt';
import helmet from 'helmet';
const port = 3000;
const app = express();
import cors from 'cors';
import send from './mailer'

// Security
app.use(helmet());

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
    json({
        type: ['application/json', 'text/plain']
    })
);

// *Models
import { sequelize } from './models';

// Routes
app.get('/api/checkToken', verifyToken, (req, res) => {
    res.status(200).send({
        message: 'Valid token'
    });
});

app.post('/api/contact', (req, res) => {
    send(req, res);
});

require('./routes/user.routes')(app);
require('./routes/service.routes')(app);

sequelize.sync({ alter: false }).then(async () => {
    app.listen(port, () => {
        console.info(`API run at http://localhost:${port}`);
    });
});
