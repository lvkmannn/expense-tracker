import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Abort controller
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch the data for that resourse');
                }
                return res.json();
            })
            .then((data) => {
                setIsLoading(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            })
        });


        return() => abortCont.abort();
    }, [url]);

    return {
        // Returning data, isLoading and error
        data, isLoading, error
    }
}

export default useFetch;