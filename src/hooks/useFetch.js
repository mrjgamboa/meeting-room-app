import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortController.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(((responseData) => {
          setData(responseData);
          setIsPending(false);
          setError(null);
        }))
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
}

export default useFetch;
