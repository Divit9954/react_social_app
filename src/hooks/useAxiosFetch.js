import { useState , useEffect } from 'react';
import axios from '../api/posts';
const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async (dataUrl) => {
      setIsLoading(true);
      try {
        const response = await axios.get(dataUrl, {
          signal: controller.signal,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          if (err.name === 'CanceledError') {
            console.log('Request canceled', err.message);
          } else {
            setFetchError(err.message);
            setData([]);
          }
        }
      } finally {
        if (isMounted) {
           isMounted && setTimeout(() => setIsLoading(false),2000);
        }
      }
    };
    fetchData(dataUrl);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }
  , [dataUrl]);
  return { data, fetchError, isLoading };
};
export default useAxiosFetch;
