import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApprenantRouter } from './src/routes/apprenantRoute.js';
import { ComputerRouter } from './src/routes/computerRoute.js';


const app = express();
const PORT = 2000;



// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

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

// Ajout des routes computers
app.use('/api', ComputerRouter);
