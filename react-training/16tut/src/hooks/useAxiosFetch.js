import { useState, useEffect } from 'react';
import axios from 'axios';

//created because there are certain aspects of a request we know we want and there are features like abort, catch error, etc that we can bundle with this react feature
const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        //used to cancel request. if we close we want to cancel request just in case
        const controller = new AbortController();

        // const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                //when we're done making request, we can safely so no more loading
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl);

//cacncel the request on cleanup because we could be in the middle of osmething
        const cleanUp = () => {
            isMounted = false;
            controller.abort()
            // source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;


//this custom hook replaced
/*
useEffect(() => {
    const fetchPosts = async () => {
      try {
        //axious instance for fetching data
        const response = await api.get('/posts');
        console.log(response.data);
        setPosts(response.data);
       
      } catch (err) {  //axious automatically catches errors not in 200 range
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])
  */