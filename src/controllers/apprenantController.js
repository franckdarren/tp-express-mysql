import { ApprenantModel } from "../models/apprenantModel.js"


export const ApprenantController = {
    // Recupérer tous les apprenants
    getAllApprenants: (req, res, next) => {
        ApprenantModel.getAllApprenants((err, apprenants) => {
            if (err) {
                res.status(500).send("Erreur lors de la récupération des apprenants");
            } else {
                res.json(apprenants);
            }
        });
    },

    // Récupérer un apprenant par son ID
    getApprenantById: (req, res, next) => {
        const apprenantId = req.params.id;
        ApprenantModel.getApprenantById(apprenantId, (err, apprenant) => {
            if (err) {
                res.status(500).send("Erreur lors de la récupération de l'apprenant");
            } else if (!apprenant) {
                res.status(404).send("Apprenant non trouvé");
            } else {
                res.json(apprenant);
            }
        });
    },

    // Ajouter un apprenant
    createApprenant: (req, res, next) => {
        const { nom, prenom, sexe, quartier, referentiel, groupe } = req.body;

        // Validation des données
        if (!nom || !sexe || !quartier || !referentiel || !groupe) {
            return res.status(400).send("Tous les champs doivent être renseignés");
        }

        ApprenantModel.createApprenant(nom, prenom, sexe, quartier, referentiel, groupe, (err, result) => {
            if (err) {
                res.status(400).send("Erreur lors de la création de l'apprenant");
            } else {
                res.status(201).send('Apprenant créé avec succès');
            }
        });
    },

    // Modifier un apprenant
    updateApprenant: (req, res, next) => {
        const apprenantId = req.params.id;
        const { nom, prenom, sexe, quartier, referentiel, groupe } = req.body;

        ApprenantModel.updateApprenant(apprenantId, nom, prenom, sexe, quartier, referentiel, groupe, (err, result) => {
            if (err) {
                res.status(400).send("Erreur lors de la mise à jour de l'apprenant");
            } else {
                res.send('Apprenant modifié avec succès');
            }
        });
    },

    // supprimer un apprenant
    deleteApprenant: (req, res, next) => {
        const apprenantId = req.params.id;

        ApprenantModel.deleteApprenant(apprenantId, (err, result) => {
            if (err) {
                res.status(400).send("Erreur lors de la suppression de l'apprenant");
            } else {
                res.send('Apprenant supprimé avec succès');
            }
        });
    },
};