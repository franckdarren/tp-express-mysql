import express from 'express';
import { ApprenantController } from '../controllers/apprenantController';

export const ApprenantRouter = express.Router();

// Récupérer tous les apprenants
ApprenantRouter.get('/api/apprenants', ApprenantController.getAllApprenants);

// Récupérer un apprenant par son ID  
ApprenantRouter.get('/api/apprenants/:id', ApprenantController.getIdApprenant);

// Ajouter un apprenant
ApprenantRouter.post('/api/apprenants', ApprenantController.addApprenant);

// Modifier un apprenant 
ApprenantRouter.put('/api/apprenants/:id', ApprenantController.updateApprenant);

// supprimer un apprenant  
ApprenantRouter.delete('/api/apprenants/:id', ApprenantController.deleteApprenant);

