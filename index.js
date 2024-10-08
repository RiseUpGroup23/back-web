// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const nodemailer = require('nodemailer');
// eslint-disable-next-line no-undef
const bodyParser = require('body-parser');
// eslint-disable-next-line no-undef
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json())

app.get('/', async (req, res ) => {
    res.send("Back andando bien");
})

app.post('/enviar-correo', async (req, res) => {
    console.log("Hola");
    const formData = req.body;
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'nicolasriseup@gmail.com',
                pass: 'eotx xdaq hbqn xibs',
            },
        });

        const mensaje = {
            from: 'nicolasriseup@gmail.com',
            to: 'riseupgroup23@gmail.com',
            subject: 'Nueva Empresa',
            text: `
                Nombre: ${formData.nombre}
                Nombre de la Empresa: ${formData.nombreEmpresa}
                Telefono: ${formData.telefono}
                Email: ${formData.email}
                Descripción: ${formData.descripcion}
            `
        }

        const info = await transporter.sendMail(mensaje);
        console.log('Correo enviado con éxito:', info);

        res.status(200).send('Formulario recibido y correo enviado correctamente');
    } catch (error) {
        console.error('Error al procesar el formulario y enviar el correo:', error);
        res.status(500).send('Error al procesar el formulario y enviar el correo');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
