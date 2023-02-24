import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Tests Services/Car', function () {
  it('Test for car creation', async function () {
    const car: ICar = {
      model: 'Golf',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 90000,
      doorsQty: 4,
      seatsQty: 5,
    };    
    const output = {
      id: '63ea3df3c632aab1a78764e16',
      model: 'Golf',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 90000,
      doorsQty: 4,
      seatsQty: 5,
    };
    const CarDomain = new Car(output);
    Sinon.stub(Model, 'create').resolves(output);
    const result = await new CarService().createCar(car);
    expect(result).to.be.deep.equal(CarDomain);
  });
  it('Test to list all cars', async function () {
    const output = [
      {
        id: '63ea3df3c632aab1a78764e16',
        model: 'Golf',
        year: 2012,
        color: 'black',
        status: true,
        buyValue: 90000,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '63ea3df3c632aab1a78764e60',
        model: 'Uno sem escada',
        year: 2012,
        color: 'black',
        status: true,
        buyValue: 9000,
        doorsQty: 4,
        seatsQty: 5,
      },
    ];
    const CarDomain = [
      new Car(output[0]),
      new Car(output[1]),
    ];
    Sinon.stub(Model, 'find').resolves(output);
    const result = await new CarService().getAllCars();
    expect(result).to.be.deep.equal(CarDomain);
  });
  it('Test to list cars by id', async function () {
    const output = {
      id: '63ea3df3c632aab1a7876e10',
      model: 'Civic',
      year: 2018,
      color: 'gold',
      status: true,
      buyValue: 70000,
      doorsQty: 4,
      seatsQty: 5,
    };
    const CarDomain = new Car(output);
    Sinon.stub(Model, 'findById').resolves(output);
    const result = await new CarService().getCarById('63ea3df3c632aab1a7876e10');
    expect(result).to.be.deep.equal(CarDomain);
  });
  it('Teste para listar os carros pelo id inexistente', async function () {
    const output = '';
    Sinon.stub(Model, 'findById').resolves(output);
    try {
      await new CarService().getCarById('63ea3df3c632aab1a7876e10');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });
  it('Test to change cars by id', async function () {
    const car: ICar = {
      model: 'Golf',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 90000,
      doorsQty: 4,
      seatsQty: 5,
    };    
    const output = {
      id: '63ea3df3c632aab1a78764e16',
      model: 'Golf',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 90000,
      doorsQty: 4,
      seatsQty: 5,
    };
    const expectedResult = new Car(output);
    Sinon.stub(Model, 'findOneAndUpdate').resolves(output);
    Sinon.stub(Model, 'findById').resolves(output);
    const result = await new CarService().updateCar('63ea3df3c632aab1a78764e16', car);
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('Test to change cars by id with invalid id', async function () {
    const car: ICar = {
      model: 'Focus',
      year: 2012,
      color: 'black',
      status: true,
      buyValue: 50000,
      doorsQty: 4,
      seatsQty: 5,
    };
    Sinon.stub(Model, 'findOneAndUpdate').resolves();
    Sinon.stub(Model, 'findById').resolves();
    try {
      await new CarService().updateCar('63ea3df3c632aab1a78764e16', car);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });
  afterEach(function () { return Sinon.restore(); });
});