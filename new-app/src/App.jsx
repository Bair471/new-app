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



import { useState } from "react";

export default function App() {
    const [page, setPage] = useState('');
    const handleClick = function (props) {
        setPage(props);
    }
    return (
        <div>
            <nav>
                <ul>
                    <button onClick={() => handleClick(<Home />)}>Добро пожаловать на главную страницу</button>
                    <button onClick={() => handleClick(<About />)}>О нас</button>
                    <button onClick={() => handleClick(<Contact />)}>Контакты</button>
                </ul>
            </nav>
            {page}
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