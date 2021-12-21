import AddVideo from "../../components/AddVideo/AddVideo";

import BlogsList from "../../components/BlogsList/BlogsList";
import { Link } from "react-router-dom"

import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from "react";



const Videos = () => {
        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(false);
        const [error, setError] = useState(false)
    
        useEffect(() => {
            setIsPending(true)
    
            const unsub = projectFirestore.collection("videos").onSnapshot((snapshot) => {
                if (snapshot.empty){
                    setError("No blogs to load")
                    setIsPending(false)
                } else {
                    let results = []
                    snapshot.docs.forEach(doc => {
                        results.push({id: doc.id, ...doc.data()})
                    })
                    setData(results)
                    setIsPending(false)
                }
            }, (err) => {
                setError(err.message)
                setIsPending(false)
            })
            
            return () => unsub
        }, [])

    return ( 
        <div>
            <h2>Videos</h2>
            <AddVideo />
            {data && data.map(video => (
                <div>
                    {video && <video src={video.url} controls></video>}
                </div>
            ))}
        </div>
     );
}
 
export default Videos;