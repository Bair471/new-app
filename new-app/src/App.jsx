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


import About from "./about";
import Contact from "./contact";
import Home from "./home";
import { useState } from "react";

export default function App() {
    const [page, setPage] = useState('');
    const handleClick = function (props) {
        setPage(props);
    }
    if(page === "home") {
        return <Home/>
    } else if (page === "about") {
        return <About/>
    } else if (page === "contact") {
        return <Contact/>
    } else
    return (
        <div>
            <nav>
                <ul>
                    <button onClick={() => handleClick("home")}>Добро пожаловать на главную страницу</button>
                    <button onClick={() => handleClick("about")}>О нас</button>
                    <button onClick={() => handleClick("contact")}>Контакты</button>
                </ul>
            </nav>
            {page}
        </div>
    );
}

