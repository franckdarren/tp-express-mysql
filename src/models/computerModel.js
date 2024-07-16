import mysql from 'mysql2';
import bodyParser from 'body-parser';
import { dbConnect } from '../services/db.js';


// Utilisation de la connexion
const db = dbConnect();

export const ComputerModel = {
    // Recupérer tous les computers
    getAllComputers: (callback) => {
        db.query('SELECT * FROM computer', (err, results) => {
            if (err) {
                console.error("Erreur lors de l'exécution de la requête: " + err.stack);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    // Récupérer un computer par son ID
    getComputerById: (computerId, callback) => {
        db.query('SELECT * FROM computer WHERE id_computer = ?', [computerId], (err, results) => {
            if (err) {
                console.error("Erreur lors de l'exécution de la requête: " + err.stack);
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    // Ajouter un computer
    createComputer: (marque, matricule, defectueux, callback) => {
        db.query('INSERT INTO computer (marque, matricule, defectueux) VALUES (?, ?, ?)', [marque, matricule, defectueux], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
                callback(err, null);
            } else {
                console.log('Nouveau computer ajouté avec succès');
                callback(null, result);
            }
        });
    },

    // Modifier un computer 
    updateComputer: (computerId, marque, matricule, defectueux, callback) => {
        db.query('UPDATE computer SET marque = ?, matricule = ?, defectueux = ? WHERE id_computer = ?',
            [marque, matricule, defectueux, computerId],
            (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
                    callback(err, null);
                } else {
                    console.log('Computer modifié avec succès');
                    callback(null, result);
                }
            }
        );
    },

    // supprimer un computer
    deleteComputer: (computerId, callback) => {
        db.query('DELETE FROM computer WHERE id_computer = ?', [computerId], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
                callback(err, null);
            } else {
                console.log('Computer supprimé avec succès');
                callback(null, result);
            }
        });
    },
};