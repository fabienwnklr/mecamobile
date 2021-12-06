require('dotenv').config();

const express = require('express');
const { verifyToken } = require('./middleware/authJwt');
const helmet = require('helmet');
const port = 3000;
const app = express();
const cors = require('cors');
const send = require('./mailer');
// Security
app.use(helmet());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    express.json({
        type: ['application/json', 'text/plain']
    })
);

// *Models
const db = require('./models');

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
require('./routes/event.routes')(app);

db.sequelize.sync({ alter: false }).then(async () => {
    app.listen(port, () => {
        console.info(`API run at http://localhost:${port}`);
    });
});
