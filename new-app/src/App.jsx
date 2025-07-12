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


import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Home from "./home";
import About from "./about";
import Contact from "./contact";

export default function App() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Добро пожаловать на главную страницу</Link>
                    </li>
                    <li>
                        <Link to="/about">О нас</Link>
                        <Button variant="contained">Contained</Button>
                        <Button variant="contained" disabled>
                            Disabled
                        </Button>
                        <Button variant="contained" href="#contained-buttons">
                            Link
                        </Button>
                    </li>
                    <li>
                        <Link to="/contact">Контакты</Link>
                        <Button>Primary</Button>
                        <Button disabled>Disabled</Button>
                        <Button href="#text-buttons">Link</Button>
                    </li>
                </ul>

                <Button onClick={handleOpen}>Open modal</Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Text in a modal</h2>
                        <p id="parent-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>
                    </Box>
                </Modal>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}
