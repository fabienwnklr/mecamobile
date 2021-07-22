require("dotenv").config();

const express = require('express');
const authJwt = require("./middleware/authJwt");
const helmet = require('helmet');
const port = 3000;
const app = express();

// Security
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    express.json({
        type: ["application/json", "text/plain"],
    })
);

// *Models
const db = require("./models");

// Routes
app.get("/api/checkToken", authJwt.verifyToken, (req, res) => {
    res.status(200).send({
        message: "Valid token",
    });
});
require("./routes/auth.routes")(app);
require("./routes/service.routes")(app);

db.sequelize.sync({ force: false }).then(() => {
    console.info("Re-sync db.");
    app.listen(port, () => {
        console.info(`API run at http://localhost:${port}`);
    });
});