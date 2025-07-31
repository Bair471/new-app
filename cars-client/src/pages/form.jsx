import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export default function Form({ onAddItems }) {
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!brand.trim()) return;

    const newItem = {
      brand,
      quantity,
      model,
      year,
      plate,
      color,
    };

    try {
      const res = await fetch('http://localhost:3000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      if (!res.ok) throw new Error('Ошибка при добавлении');

      const addedCar = await res.json();

      onAddItems(addedCar);

      setBrand('');
      setQuantity(1);
      setModel('');
      setYear('');
      setPlate('');
      setColor('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 200, margin: 'auto', mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Марка"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              fullWidth
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Модель"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sx={{ width: 195 }}>
            <TextField
              select
              label="Год"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="">
                <em>Год</em>
              </MenuItem>
              {Array.from({ length: 40 }, (_, i) => 1990 + i).map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Гос. номер"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Цвет"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>

          <Grid item xs={12} sx={{ width: 195 }}>
            <TextField
              select
              label="Кол-во"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              fullWidth
              size="small"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Добавить
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
