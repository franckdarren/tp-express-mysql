import { ApprenantModel } from "../models/apprenantModel"


export const ApprenantController = {
    // Recupérer tous les apprenants
    getAllApprenants(req, res) {
        res.json(ApprenantModel.getApprenants());
    },

    // Récupérer un apprenant par son ID
    getIdApprenant(req, res) {
        res.json(ApprenantModel.getIdApprenant());
    },

    // Ajouter un apprenant
    addApprenant(req, res) {
        res.json(ApprenantModel.addApprenant());
    },

    // Modifier un apprenant
    updateApprenant(req, res) {
        res.json(ApprenantModel.updateApprenant());
    },

    // supprimer un apprenant
    deleteApprenant(req, res) {
        res.json(ApprenantModel.deleteApprenant());
    },
};