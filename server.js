import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import { ApprenantRouter } from './src/routes/apprenantRoute.js';

const app = express();
const PORT = 2000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () =>
    console.log(`Votre serveur est sur le port ${PORT}`)
);

// Analyse du corps de la requête au format JSON
app.use(express.json());

// Ajout des routes apprenants
app.use('/api', ApprenantRouter);
