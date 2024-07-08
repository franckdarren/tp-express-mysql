import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

const app = express();
const PORT = 2000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection PROD
const db = mysql.createConnection({
    host: 'mysql-franck-darren.alwaysdata.net',
    user: '367993',
    password: 'jeune355895',
    database: 'franck-darren_ecole241',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion MySQL: ' + err.stack);
        return;
    }
    console.log('Connecté à mysql avec ID ' + db.threadId);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () =>
    console.log(`Votre serveur est sur le port ${PORT}`)
);

// Récupérer tous les apprenant
app.route('/api/apprenants')
    .get((req, res, next) => {
        db.query('SELECT * FROM apprenant', (err, results) => {
            if (err) {
                console.error("Erreur lors de l'execution de la requête: " + err.stack);
                res.status(500).send("Erreur lors de la recupération de l'apprenant");
                return;
            }
            res.json(results);
        });
    })

// Récupérer un apprenant par son ID    
app.route('/api/apprenants/:id')
    .get((req, res, next) => {
        const apprenantId = req.params.id;
        db.query('SELECT * FROM apprenant WHERE id =?', [apprenantId], (err, results) => {
            if (err) {
                console.error("Erreur lors de l'execution de la requête: " + err.stack);
                res.status(500).send("Erreur lors de la recupération de l'apprenant");
                return;
            }
            res.json(results[0]);
        });
    })

// Ajouter un apprenant
app.post('/api/apprenants', (req, res) => {
    const { nom, prenom, sexe, quartier, referentiel, groupe } = req.body;
    // Validation des données
    if (!nom || !sexe || !quartier || !referentiel || !groupe) {
        return res.status(400).send("Tous les champs doivent être renseignés");
    }
    db.query('INSERT INTO apprenant (nom, prenom, sexe, quartier, referentiel, groupe) VALUES (?, ?, ?, ?, ?, ?)', [nom, prenom, sexe, quartier, referentiel, groupe], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
            return res.status(400).send("Erreur lors de la création de l'apprenant");
        }
        console.log('Nouvel apprenant ajouté avec succès');
        res.status(201).send('Apprenant créé avec succès');
    });
});

// Modifier un apprenant
app.put('/api/apprenants/:id', (req, res) => {
    const { nom, prenom, sexe, quartier, referentiel, groupe } = req.body;
    const apprenantId = req.params.id;
    db.query('UPDATE apprenant SET nom = ?, prenom = ?, sexe = ?, quartier = ?, referentiel = ?, groupe = ? WHERE id = ?',
        [nom, prenom, sexe, quartier, referentiel, groupe, apprenantId],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
                return res.status(400).send("Erreur lors de la mise à jour de l'apprenant");
            }
            res.send('Apprenant modifié avec succès');
        }
    );
});

// Supprimer un apprenant
app.delete('/api/apprenants/:id', (req, res) => {
    const apprenantId = req.params.id;
    db.query('DELETE FROM apprenant WHERE id = ?', [apprenantId], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
            res.status(400).send("Erreur lors de la suppression de l'apprenant");
            return;
        }
        res.send('Apprenant supprimé avec succès');
    });
});

