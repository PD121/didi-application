import { useEffect, useState } from "react";



const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)

    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(postData)
        })
    }


    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async (fetchOptions) => {
            setIsPending(true)

           try { 
               const response = await fetch(url, {...fetchOptions, signal: controller.signal})
                if (!response.ok) {
                    throw new Error('fetch failed')
                }
                const data = await response.json()
            
                setData(data)
                setIsPending(false)
                setError(null)
            } catch (err) {
                if(err.name === "AbortError"){
                    console.log("The fetch was aborted")
                } else {
                    setError('Failed to load data')
                    setIsPending(false)
                }
            }
        }

        if (method === "GET"){
            fetchData()
        }
        if (method === "POST" && options) {
            fetchData(options)
        }

        return () => {
            controller.abort()
        }
        
        
    }, [url, options, method])
    return { data, isPending, error, postData };
}
 
export default useFetch;