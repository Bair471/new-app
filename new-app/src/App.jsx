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


import { Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";

export default function App() {
    const [page, setPage] = useState('');
    const handleClick = function () {
        setPage = < Link />
    }

    return (
        <div>
            <nav>
                <ul>
                    <Link to="/Home">На главную</Link>
                    <Link to="/About">О нас</Link>
                    <Link to="/Contact">Контакты</Link>
                </ul>
            </nav>

            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}

function Home() {
    return <h2>Добро пожаловать на главную страницу</h2>;
}

function About() {
    return <h2>О нас</h2>;
}

function Contact() {
    return <h2>Контакты</h2>;
}