import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { carsDB } from './data.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/carsDB/:id', (req, res) => {
  const carsID = parseInt(req.params.id);

  const car = carsDB.find(car => car.id === carsID);

  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Машина не найдена' });
  }
});

app.get('/carsDB', (req, res) => {
  res.send(carsDB);
})

app.post('/carsDB', (req, res) => {
  const newCar = req.body;

  if (!newCar || !newCar.id || !newCar.brand || !newCar.model) {
    return res.status(400).json({ message: 'Неверные данные' });
  }

  carsDB.push(newCar);

  res.status(201).json({ message: 'Машина добавлена', car: newCar });
})

app.delete('/carsDB/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const index = carsDB.findIndex((car) => car.id === idToDelete);

  if (index === -1) {
    return res.status(404).json({ message: 'Машина не найдена' });
  }

  const deletedCar = carsDB.splice(index, 1);
  res.status(200).json({ message: 'Машина удалена', car: deletedCar[0] });
});

app.listen(3000, () => {
  console.log('Сервер работает на http://localhost:3000');
});
