// import { useState } from "react";

// export default function App() {
//     const [number, setNumber] = useState(0);
//     const [number2, setNumber2] = useState(0);
//     const [name, setName] = useState('Bair');

//     function addName(e) {
//         setName(e.target.value);
//     };

//     function addNumber() {
//        setNumber(number + 1);
//        setNumber2(number2 + 2);
//     };

//     return(
//     <div className="page">    
//         <div>
//             Hello {name}
//         </div>
//         <div className="button">
//             <button onClick={addNumber}>Add</button>
//         </div>
//         <div>
//             number = {number}
//         </div>
//         <div>
//             number 2 = {number2}
//         </div>
//         <div>
//             <input onChange={e => {addName(e)}}/>
//         </div>
//     </div>
//     )
// }


// import { Routes, Route, Link } from "react-router-dom";
// import { useState } from "react";
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Home from "./home";
// import About from "./about";
// import Contact from "./contact";

// export default function App() {
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//     };

//     return (
//         <div>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/">Добро пожаловать на главную страницу</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">О нас</Link>
//                         <Button variant="contained">Contained</Button>
//                         <Button variant="contained" disabled>
//                             Disabled
//                         </Button>
//                         <Button variant="contained" href="#contained-buttons">
//                             Link
//                         </Button>
//                     </li>
//                     <li>
//                         <Link to="/contact">Контакты</Link>
//                         <Button>Primary</Button>
//                         <Button disabled>Disabled</Button>
//                         <Button href="#text-buttons">Link</Button>
//                     </li>
//                 </ul>

//                 <Button onClick={handleOpen}>Open modal</Button>

//                 <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="parent-modal-title"
//                     aria-describedby="parent-modal-description"
//                 >
//                     <Box sx={{ ...style, width: 400 }}>
//                         <h2 id="parent-modal-title">Text in a modal</h2>
//                         <p id="parent-modal-description">
//                             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                         </p>
//                     </Box>
//                 </Modal>
//             </nav>

//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//             </Routes>
//         </div>
//     );
// }
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';

export default function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Добро пожаловать на главную страницу</Link>
                    </li>
                    <li>
                        <Link to="/about">О нас</Link>
                    </li>
                    <li>
                        <Link to="/contact">Контакты</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
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
        <div>
            <Form onAddItems={handleAddItems} />
            <ul>
                {cars.map((car) => (
                    <Car key={car.id} car={car} onDeleteItem={handleDeleteItem} />
                ))}
            </ul>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>О нас</h2>
            <p>About us</p>
        </div>
    );
}


function Contact() {
    return (
        <div>
            <h2>Контакты</h2>
            <p>Contacts</p>
        </div>
    );
}


function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");
    const [color, setColor] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;

        const newItem = {
            id: Date.now(),
            description,
            quantity,
            model,
            year,
            plate,
            color
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
        <form onSubmit={handleSubmit}>
            <h3>Add Car</h3>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Кол-во</TableCell>
                            <TableCell>Марка</TableCell>
                            <TableCell>Модель</TableCell>
                            <TableCell>Год</TableCell>
                            <TableCell>Гос. номер</TableCell>
                            <TableCell>Цвет</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                >
                                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                                        <option value={num} key={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </TableCell>

                            <TableCell>
                                <input
                                    type="text"
                                    placeholder="Марка"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <input
                                    type="text"
                                    placeholder="Модель"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    <option value="">Год</option>
                                    {Array.from({ length: 40 }, (_, i) => 1990 + i).map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </TableCell>

                            <TableCell>
                                <input
                                    type="text"
                                    placeholder="Гос. номер"
                                    value={plate}
                                    onChange={(e) => setPlate(e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <input
                                    type="text"
                                    placeholder="Цвет"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained">Add</Button>
        </form>
    );
}

function Car({ car, onDeleteItem }) {
    return (
        <li>
            <span style={car.packed ? { textDecoration: "line-through" } : {}}>
                {car.quantity} {car.description} {car.model} {car.year} {car.plate} {car.color}
            </span>
            <button onClick={() => onDeleteItem(car.id)}>❌</button>
        </li>
    );
}
