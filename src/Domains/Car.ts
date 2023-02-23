import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(car);
    this.seatsQty = car.seatsQty;
    this.doorsQty = car.doorsQty;
  }
  getDoorsQty() { return this.doorsQty; }
  getSeatsQty() { return this.seatsQty; }
}

export default Car;