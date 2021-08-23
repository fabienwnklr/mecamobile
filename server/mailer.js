module.exports = function send(req, res) {
    const nodemailer = require('nodemailer');

    const email = req.body.email;
    const message = req.body.message;
    const phoneNumber = req.body.phoneNumber;
    console.log(req.body);
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    // Message object
    let data = {
        from: email,
        to: `Me <${process.env.MAIL_USER}>`,
        subject: 'Formulaire de contact',
        html: `
        <html>
            <head>
                <link rel="stylesheet" href="./mailer.css">
            </head>
            <body>
                <div class="page">
                    <h1>Message envoyé depuis le formulaire de contact du site</h1>
                    <p>Numéro de téléphone : ${phoneNumber}</p>
                    <p>Adresse mail : ${email}</p>
                    <p>Message : ${message}</p>
                </div>
            </body>
        </html>`,
    };

    transporter.sendMail(data).then(info => {
        res.send({ message: 'Message remis.', infos: info.messageId })
    }).catch(err => {
        console.error(err);
        res.send({ message: 'Une erreur est survenue. Merci d\'essayer un autre moyen de contact.', error: err })
    })


}