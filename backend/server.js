import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'cars_db',
  user: 'adminadmin',
  password: 'adminadmin',
});

client.connect();

const app = express();
app.use(express.json());
app.use(cors());

// Получить машину по ID
app.get('/cars/:id', async (req, res) => {
  const carsID = parseInt(req.params.id);
  try {
    const result = await client.query('SELECT * FROM cars WHERE id = $1', [carsID]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Машина не найдена' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить все машины
app.get('/cars', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавить новую машину
app.post('/cars', async (req, res) => {
  const { brand, quantity, model, year, plate, color } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO cars (brand, quantity, model, year, plate, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [brand, quantity, model, year, plate, color]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удалить машину
app.delete('/cars/:id', async (req, res) => {
  const idToDelete = parseInt(req.params.id);
  try {
    const result = await client.query('DELETE FROM cars WHERE id = $1 RETURNING *', [idToDelete]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Машина не найдена' });
    }
    res.json({ message: 'Машина успешно удалена', car: result.rows[0] });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(3000, () => {
  console.log('Сервер работает на http://localhost:5432');
});

