import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleModel extends AbstractODM<IMotorcycle> {
  constructor() {
    const options = {
      model: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      status: Boolean,
      buyValue: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      engineCapacity: {
        type: Number, 
        equired: true,
      },
    };
    super(options, 'Motorcycle');
  }
}
export default MotorcycleModel;