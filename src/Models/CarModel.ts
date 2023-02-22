import mongoose from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarModel {
  private Schema: mongoose.Schema;
  public model: mongoose.Model<ICar>;

  constructor() {
    this.Schema = new mongoose.Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: Boolean,
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    }, { versionKey: false });
    this.model = mongoose.models.Car || mongoose.model('Car', this.Schema);
  }
}

export default CarModel;