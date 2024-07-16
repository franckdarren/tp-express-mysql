import express from 'express';
import { ComputerController } from '../controllers/computerController.js';

export const ComputerRouter = express.Router();

// Récupérer tous les computers
ComputerRouter.get('/computers', ComputerController.getAllComputers);

// Récupérer un computers par son ID  
ComputerRouter.get('/computers/:id', ComputerController.getComputerById);

// Ajouter un computers
ComputerRouter.post('/computers', ComputerController.createComputer);

// Modifier un computers 
ComputerRouter.put('/computers/:id', ComputerController.updateComputer);

// supprimer un computers  
ComputerRouter.delete('/computers/:id', ComputerController.deleteComputer);


