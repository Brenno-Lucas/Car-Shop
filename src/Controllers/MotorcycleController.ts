import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private service: MotorcycleService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.service = new MotorcycleService();
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async createMotorcycle() {
    try {
      const Motorcycle = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        category: this.req.body.category,
        engineCapacity: this.req.body.engineCapacity,
      };
      const result = await this.service.createMotorcycle(Motorcycle);
      return this.res.status(201).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  async getAllMotorcycles() {
    try {
      const result = await this.service.getAllMotorcycles();
      return this.res.status(200).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  async getMotorcycleById() {
    try {
      const { id } = this.req.params;
      const result = await this.service.getMotorcyclesById(id);
      return this.res.status(200).json(result);
    } catch (error) {
      return this.res.status(404).json({ message: (error as Error).message });
    }
  }
}

export default MotorcycleController;
