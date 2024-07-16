import { ComputerModel } from "../models/computerModel.js"


export const ComputerController = {
    // Recupérer tous les Computers
    getAllComputers: (req, res, next) => {
        ComputerModel.getAllComputers((err, computers) => {
            if (err) {
                res.status(500).send("Erreur lors de la récupération des Computers");
            } else {
                res.json(computers);
            }
        });
    },

    // Récupérer un Computer par son ID
    getComputerById: (req, res, next) => {
        const computerId = req.params.id;
        ComputerModel.getComputerById(computerId, (err, computer) => {
            if (err) {
                res.status(500).send("Erreur lors de la récupération du computer");
            } else if (!computer) {
                res.status(404).send("Computer non trouvé");
            } else {
                res.json(computer);
            }
        });
    },

    // Ajouter un Computer
    createComputer: (req, res, next) => {
        const { marque, matricule, defectueux } = req.body;

        // Validation des données
        if (!marque) {
            return res.status(400).send("Tous les champs doivent être renseignés");
        }

        ComputerModel.createComputer(marque, matricule, defectueux, (err, result) => {
            if (err) {
                res.status(400).send("Erreur lors de la création du Computer");
            } else {
                res.status(201).send('Computer créé avec succès');
            }
        });
    },

    // Modifier un Computer
    updateComputer: (req, res, next) => {
        const computerId = req.params.id;
        const { marque, matricule, defectueux } = req.body;

        ComputerModel.updateComputer(computerId, marque, matricule, defectueux, (err, result) => {
            if (err) {
                res.status(400).send("Erreur lors de la mise à jour du Computer");
            } else {
                res.send('Computer modifié avec succès');
            }
        });
    },

    // supprimer un Computer
    deleteComputer: (req, res, next) => {
        const computerId = req.params.id;

        ComputerModel.deleteComputer(computerId, (err, result) => {
            if (err) {
                res.status(400).send("Erreur lors de la suppression du Computer");
            } else {
                res.send('Computer supprimé avec succès');
            }
        });
    },
};