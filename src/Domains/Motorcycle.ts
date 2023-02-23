import IMotorcycle from '../Interfaces/IMotorcycle';
import Auto from './Vehicle';

class Motorcycle extends Auto {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  getCategory() { return this.category; }
  getEngineCapacity() { return this.engineCapacity; }
}

export default Motorcycle;