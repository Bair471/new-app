import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { cars } from './data.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/cars/:id', (req, res) => {
  const carsID = parseInt(req.params.id);

  const car = cars.find(car => car.id === carsID);

  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Машина не найдена' });
  }
});

app.get('/cars', (req, res) => {
  res.send(cars);
})

app.post('/cars', (req, res) => {
  const newCar = req.body;

  if (!newCar || !newCar.id || !newCar.description || !newCar.quantity || !newCar.model || !newCar.year || !newCar.plate || !newCar.color) {
    return res.status(400).json({ message: 'Неверные данные' });
  }

  cars.push(newCar);

  res.status(201).json({ message: 'Машина добавлена', car: newCar });
})

app.delete('/cars/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const index = cars.findIndex((car) => car.id === idToDelete);

  if (index === -1) {
    return res.status(404).json({ message: 'Машина не найдена' });
  }

  const deletedCar = cars.splice(index, 1);
  res.status(200).json({ message: 'Машина удалена', car: deletedCar[0] });
});

app.listen(3000, () => {
  console.log('Сервер работает на http://localhost:3000');
});
