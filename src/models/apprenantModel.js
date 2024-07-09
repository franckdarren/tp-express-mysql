import mysql from 'mysql2';
import bodyParser from 'body-parser';

// MySQL Connection PROD
const db = mysql.createConnection({
    host: 'mysql-franck-darren.alwaysdata.net',
    //host: 'localhost',
    //user: 'nills',
    user: '367993',
    password: 'jeune355895',
    database: 'franck-darren_ecole241',
    //database: 'ecole241',
    connectTimeout: 10000,
});

// Fonction pour se reconnecter en cas d'échec
function reconnectDatabase() {
    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion MySQL: ' + err.stack);
            setTimeout(reconnectDatabase, 5000); // Nouvelle tentative dans 5 secondes
        } else {
            console.log('Connecté à mysql avec ID ' + db.threadId);
        }
    });
}

// Initialiser la connexion
reconnectDatabase();


export const ApprenantModel = {
    // Recupérer tous les apprenants
    getAllApprenants: (callback) => {
        db.query('SELECT * FROM apprenant', (err, results) => {
            if (err) {
                console.error("Erreur lors de l'exécution de la requête: " + err.stack);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    // Récupérer un apprenant par son ID
    getApprenantById: (apprenantId, callback) => {
        db.query('SELECT * FROM apprenant WHERE id = ?', [apprenantId], (err, results) => {
            if (err) {
                console.error("Erreur lors de l'exécution de la requête: " + err.stack);
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    // Ajouter un apprenant
    createApprenant: (nom, prenom, sexe, quartier, referentiel, groupe, callback) => {
        db.query('INSERT INTO apprenant (nom, prenom, sexe, quartier, referentiel, groupe) VALUES (?, ?, ?, ?, ?, ?)', [nom, prenom, sexe, quartier, referentiel, groupe], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
                callback(err, null);
            } else {
                console.log('Nouvel apprenant ajouté avec succès');
                callback(null, result);
            }
        });
    },

    // Modifier un apprenant 
    updateApprenant: (apprenantId, nom, prenom, sexe, quartier, referentiel, groupe, callback) => {
        db.query('UPDATE apprenant SET nom = ?, prenom = ?, sexe = ?, quartier = ?, referentiel = ?, groupe = ? WHERE id = ?',
            [nom, prenom, sexe, quartier, referentiel, groupe, apprenantId],
            (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
                    callback(err, null);
                } else {
                    console.log('Apprenant modifié avec succès');
                    callback(null, result);
                }
            }
        );
    },

    // supprimer un apprenant
    deleteApprenant: (apprenantId, callback) => {
        db.query('DELETE FROM apprenant WHERE id = ?', [apprenantId], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
                callback(err, null);
            } else {
                console.log('Apprenant supprimé avec succès');
                callback(null, result);
            }
        });
    },
};