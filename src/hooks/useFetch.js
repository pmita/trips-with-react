import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    //STATE & VARIABLES
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);

    //useEFFECT
    useEffect(() => {
        const fetchData = async () => {
            //Loading starts
            setIsPending(true);
            const response = await fetch(url);
            const json = await response.json();
            //Loading is finished
            setIsPending(false);
            setData(json);
        }

        fetchData();
    }, [url])

    return { data, isPending }; 
}