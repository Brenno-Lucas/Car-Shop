import express, { NextFunction, Request, Response } from 'express';
import CarController from '../Controllers/CarController';
import validId from '../Middlewares/ValidID';

const routes = express.Router();

routes.get('/');

routes.post('/', async (req: Request, res: Response, next: NextFunction) => (
  new CarController(req, res, next).createCar()));

routes.get('/', async (req: Request, res: Response, next: NextFunction) => (
  new CarController(req, res, next).getAllCars()));

routes
  .get('/:id', validId, async (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).getCarById()));

routes
  .put('/:id', validId, async (req: Request, res: Response, next: NextFunction) => (
    new CarController(req, res, next).updateCar()));

export default routes;