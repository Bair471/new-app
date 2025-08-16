import { useState, useEffect } from "react";
import Form from "./form";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import BasicModal from "./edit";

export default function Home() {
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

function CarsTable () {

const [cars, setCars] = useState([]);
const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/cars')
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((err) => console.error('Failed to load cars', err));
    }, []);

    const onDelete = async(id) => {
        await fetch(`http://localhost:3000/cars/${id}`, {
            method: 'DELETE',
        });
        setCars((cars) => cars.filter((car) => car.id !== id));
    };

    const handleEdit = async(car) => {
        setSelectedCar(car);
        await fetch(`http://localhost:3000/cars/${car.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        });
    }

    const handleCloseModal = () => {
                setSelectedCar(null);
                // Обновляем список машин после редактирования
                fetch('http://localhost:3000/cars')
                    .then((res) => res.json())
                    .then((data) => setCars(data))
                    .catch((err) => console.error('Ошибка загрузки машин:', err));
            };

return (
    <>
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
                        <TableCell>{car.brand}</TableCell>
                        <TableCell>{car.model}</TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell>{car.plate}</TableCell>
                        <TableCell>{car.color}</TableCell>
                        <TableCell>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => handleEdit(car)}
                                sx={{ mr: 1 }}
                            >
                                Редактировать
                            </Button>
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

        <BasicModal
            car={selectedCar}
            onSave={handleCloseModal}
        />
    </>
);
}