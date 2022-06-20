import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    //STATE & VARIABLES
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    //useEFFECT
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            //Reset any state
            setIsPending(true);

            //Inititate fetching request
            try{
                const response = await fetch(url, { signal: controller.signal }); //we can pass the controller in the object arguement
                if(!response.ok){
                    throw new Error(response.statusText);
                }

                const json = await response.json();
                //Set state after success
                setData(json);
                setIsPending(false); 
                setError(null);
            }catch(err){
                //Set state after error encounter
                if(err.name === 'AbortError'){
                    console.log('the fetch was aborted')
                } else {
                    setError('Could not fetch the data');
                    setIsPending(false);
                    console.log(err.message);
                }
            }
        }

        fetchData();

        //Cleanup function is fucntion that we return in our useEffect hook
        //when component unmounts it will fire up this code
        return () => {
            //we need to use an abort controller for our fetch requests
            //.abort method looks up any fetch request associated with this controller and stops them immediatelly
            //when this happens a special error is throw, an abort error
            controller.abort(); 
        }
    }, [url])

    return { data, isPending, error }; 
}