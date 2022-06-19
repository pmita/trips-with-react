import { useState, useEffect, useCallback } from 'react'; //creates a cached version of an function
import './TripList.css';

const TripList = () => {
    //STATE & VARIABLES
    const [trips, setTrips] = useState([]); //useState negates the reference type varaibles problem we have
    const [url, setUrl] = useState('http://localhost:3000/trips');

    console.log(trips);
    
    //FUNCTIONS
    const fetchTrips = useCallback(async () => {
        const response = await fetch(url)
        const json = await response.json();
        setTrips(json);
    }, [url]);

    useEffect(() => {
        fetchTrips()
    }, [url, fetchTrips]);


    return(
        <div className='trip-list'>
            <h2>Trip List</h2>
            <ul>
                {trips.map(trip => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>

            <div className='filters'>
                <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>European Trips</button>
                <button onClick={() => setUrl('http://localhost:3000/trips')}>All Trips</button>
            </div>
        </div>
    );
}

export default TripList;