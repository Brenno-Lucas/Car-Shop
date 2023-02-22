import { Model } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

const errorMensage = 'Car not found';

class CarService {
  private model: Model<ICar>;

  constructor() {
    this.model = new CarModel().model;
  }

  public async createCar(car: ICar) {
    const result = await this.model.create(car);
    return this.createCarDomain(result);
  }

  private createCarDomain(infos: ICar) {
    return new Car(infos);
  }

  public async getAllCars() {
    const result = await this.model.find();
    return result.map((car) => this.createCarDomain(car));
  }

  public async getCarById(id: string) {
    const result = await this.model.findById({ _id: id });
    if (!result) throw new Error(errorMensage);
    return this.createCarDomain(result);
  }

  public async updateCar(id: string, fields: ICar) {
    const result = await this.model.findByIdAndUpdate({ _id: id }, fields);
    const newData = await this.model.findById({ _id: id });
    if (!(result && newData)) throw new Error(errorMensage);
    return this.createCarDomain(newData);
  }
}

export default CarService;