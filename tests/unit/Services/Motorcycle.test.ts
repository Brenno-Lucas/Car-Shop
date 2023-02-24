import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Tests Services/Motorcycle', function () {
  it('Test for motorcycle creation', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Custom',
      engineCapacity: 600,
    };
    const output = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycle = new Motorcycle(output);
    Sinon.stub(Model, 'create').resolves(output);
    const result = await new MotorcycleService().createMotorcycle(motorcycleInput);
    expect(result).to.be.deep.equal(motorcycle);
  });
  it('Test to list all motorcycle', async function () {
    const output = [
      {
        id: '6348513f34c397abcad040b2',
        model: 'Honda CG 150 Titan',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 15.000,
        category: 'Street',
        engineCapacity: 150,
      },
      {
        id: '6348513f34c397abcad040b3',
        model: 'Honda Cb 300f Hornet',
        year: 2005,
        color: 'red',
        status: true,
        buyValue: 20.000,
        category: 'Street',
        engineCapacity: 300,
      },
    ];
    const motorcycle = [
      new Motorcycle(output[0]),
      new Motorcycle(output[1]),
    ];
    Sinon.stub(Model, 'find').resolves(output);
    const result = await new MotorcycleService().getAllMotorcycles();
    expect(result).to.be.deep.equal(motorcycle);
  });
  it('Test to list motorcycles by id', async function () {
    const output = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda CG 150 Titan',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 15.000,
      category: 'Street',
      engineCapacity: 150,
    };
    const motorcycle = new Motorcycle(output);
    Sinon.stub(Model, 'findById').resolves(output);
    const result = await new MotorcycleService().getMotorcyclesById('6348513f34c397abcad040b2');
    expect(result).to.be.deep.equal(motorcycle);
  });
  it('Test to list motorcycles by non-existent id', async function () {
    const output = '';
    Sinon.stub(Model, 'findById').resolves(output);
    try {
      await new MotorcycleService().getMotorcyclesById('6348513f34c397abcad040b45');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });
  afterEach(function () { return Sinon.restore(); });
});