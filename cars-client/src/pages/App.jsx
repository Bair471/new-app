import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'О нас', path: '/about' },
  { label: 'Контакты', path: '/contact' },
];

function DenseAppBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Мой сайт
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{ color: 'white', mx: 1 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ width: 48 }} />
      </Toolbar>
    </AppBar>
  );
}

function CarsTable({ cars, onDelete }) {
  return (
    <Table sx={{ maxWidth: 500, margin: 'auto', mb: 4 }}>
      <TableHead>
        <TableRow>
          <TableCell>Кол-во</TableCell>
          <TableCell>Марка</TableCell>
          <TableCell>Модель</TableCell>
          <TableCell>Год</TableCell>
          <TableCell>Гос. номер</TableCell>
          <TableCell>Цвет</TableCell>
          <TableCell>Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cars.map((car) => (
          <TableRow key={car.id}>
            <TableCell>{car.quantity}</TableCell>
            <TableCell>{car.description}</TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.year}</TableCell>
            <TableCell>{car.plate}</TableCell>
            <TableCell>{car.color}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => onDelete(car.id)}
              >
                Удалить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Home() {
  const [cars, setCars] = useState([]);

  function handleAddItems(car) {
    setCars((prevCars) => [...prevCars, car]);
  }

  function handleDeleteItem(id) {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  }

  return (
    <div style={{ padding: 16 }}>
      <Form onAddItems={handleAddItems} />
      <CarsTable cars={cars} onDelete={handleDeleteItem} />
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 16 }}>
      <h2>О нас</h2>
      <p>About us</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Контакты</h2>
      <p>Contacts</p>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      model,
      year,
      plate,
      color,
    };

    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
    setModel('');
    setYear('');
    setPlate('');
    setColor('');
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 200, margin: 'auto', mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Марка"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default function App() {
  return (
    <>
      <DenseAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
