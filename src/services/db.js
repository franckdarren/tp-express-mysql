import mysql from 'mysql2';

export const dbConnect = () => {
    // Créer la connexion MySQL
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
                console.log('Connecté à MySQL avec ID ' + db.threadId);
            }
        });
    }

    // Initialiser la connexion
    reconnectDatabase();

    // Retourner l'objet de connexion pour l'utiliser ailleurs
    return db;
};


