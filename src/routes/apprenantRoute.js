import express from 'express';
import { ApprenantController } from '../controllers/apprenantController.js';

export const ApprenantRouter = express.Router();

// Récupérer tous les apprenants
ApprenantRouter.get('/apprenants', ApprenantController.getAllApprenants);

// Récupérer un apprenant par son ID  
ApprenantRouter.get('/apprenants/:id', ApprenantController.getApprenantById);

// Ajouter un apprenant
ApprenantRouter.post('/apprenants', ApprenantController.createApprenant);

// Modifier un apprenant 
ApprenantRouter.put('/apprenants/:id', ApprenantController.updateApprenant);

// supprimer un apprenant  
ApprenantRouter.delete('/apprenants/:id', ApprenantController.deleteApprenant);


