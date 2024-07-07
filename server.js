import express from 'express';

const app = express();
const PORT = 2000

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () =>
    console.log(`Votre serveur est sur le port ${PORT}`)
);