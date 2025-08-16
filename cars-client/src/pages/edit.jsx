import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ car, onSave }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    plate: '',
    color: '',
    quantity: 1
  });

  useEffect(() => {
    if (car !== null && car !== undefined) {
      setFormData(car);
    }
  }, [car]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cars/${car.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  const handleClose = () => {
    onSave();
  };

  return (
    <Modal open={!!car} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Редактировать автомобиль
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="brand"
              label="Марка"
              value={formData.brand || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="model"
              label="Модель"
              value={formData.model || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="year"
              label="Год"
              value={formData.year || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="plate"
              label="Гос. номер"
              value={formData.plate || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="color"
              label="Цвет"
              value={formData.color || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="quantity"
              label="Количество"
              type="number"
              value={formData.quantity || 1}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}