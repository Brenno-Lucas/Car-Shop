import express, { NextFunction, Request, Response } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import ValidID from '../Middlewares/ValidID';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => (
  new MotorcycleController(req, res, next).createMotorcycle()));

router.get('/', async (req: Request, res: Response, next: NextFunction) => (
  new MotorcycleController(req, res, next).getAllMotorcycles()));

router.get('/:id', ValidID, async (req: Request, res: Response, next: NextFunction) => (
  new MotorcycleController(req, res, next).getMotorcycleById()));

export default router;