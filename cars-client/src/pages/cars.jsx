import { useState, useEffect } from "react";

export default function Cars() {
    const [cars, setCars] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:3000/carsDB')
        .then(res => res.json())
        .then(data => setCars(data));
    }, []);
  
    return (
      <div>
        <h2>Список автомобилей</h2>
        <ul>
          {cars.map(car => (
            <li key={car.id}>{car.model} — {car.year}</li>
          ))}
        </ul>
      </div>
    );
  }