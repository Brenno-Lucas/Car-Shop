import { Model } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/MotorcycleModel';

class MotorcycleService {
  private model: Model<IMotorcycle>;

  constructor() {
    this.model = new MotorcycleModel().model;
  }

  private createMotorcycleDomain(motor: IMotorcycle) {
    return new Motorcycle(motor);
  }

  async createMotorcycle(motor: IMotorcycle) {
    const result = await this.model.create(motor);
    return this.createMotorcycleDomain(result);
  }

  async getAllMotorcycles() {
    const result = await this.model.find();
    return result.map((motor) => this.createMotorcycleDomain(motor));
  }

  async getMotorcyclesById(id: string) {
    const result = await this.model.findById({ _id: id });
    if (!result) throw new Error('Motorcycle not found');
    return this.createMotorcycleDomain(result);
  }
}

export default MotorcycleService;