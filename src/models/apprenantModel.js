import mysql from 'mysql2';
import bodyParser from 'body-parser';
import { dbConnect } from '../services/db.js';

// Utilisation de la connexion
const db = dbConnect();

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
        db.query('SELECT * FROM apprenant WHERE id_apprenant = ?', [apprenantId], (err, results) => {
            if (err) {
                console.error("Erreur lors de l'exécution de la requête: " + err.stack);
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    // Ajouter un apprenant
    createApprenant: (nom, prenom, referentiel, tel, id_computer, callback) => {
        db.query('INSERT INTO apprenant (nom, prenom, referentiel, tel, id_computer) VALUES (?, ?, ?, ?, ?)', [nom, prenom, referentiel, tel, id_computer], (err, result) => {
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
    updateApprenant: (apprenantId, nom, prenom, referentiel, tel, id_computer, callback) => {
        db.query('UPDATE apprenant SET nom = ?, prenom = ?, referentiel = ?, tel = ?, id_computer = ? WHERE id_apprenant = ?',
            [nom, prenom, referentiel, tel, id_computer, apprenantId],
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
        db.query('DELETE FROM apprenant WHERE id_apprenant = ?', [apprenantId], (err, result) => {
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