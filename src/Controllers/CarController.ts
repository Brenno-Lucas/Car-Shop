import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  async createCar() {
    try {
      const car = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        doorsQty: this.req.body.doorsQty,
        seatsQty: this.req.body.seatsQty,
      };
      const result = await this.service.createCar(car);
      return this.res.status(201).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  async getAllCars() {
    try {
      const result = await this.service.getAllCars();
      return this.res.status(200).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  async getCarById() {
    try {
      const { id } = this.req.params;
      const result = await this.service.getCarById(id);
      return this.res.status(200).json(result);
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }

  async updateCar() {
    try {
      const { id } = this.req.params;
      const car = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        doorsQty: this.req.body.doorsQty,
        seatsQty: this.req.body.seatsQty,
      };
      const result = await this.service.updateCar(id, car);
      return this.res.status(200).json(result);
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }
}

export default CarController;