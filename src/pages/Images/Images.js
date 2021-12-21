import AddImage from "../../components/AddImage/AddImage";

import BlogsList from "../../components/BlogsList/BlogsList";
//import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom"

import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from "react";

import "./Images.css"



const Images = () => {
        // const { data: blogPosts, isPending, error } = useFetch("http://localhost:3000/blogs")
        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(false);
        const [error, setError] = useState(false)
    
        useEffect(() => {
            setIsPending(true)
    
            const unsub = projectFirestore.collection("images").onSnapshot((snapshot) => {
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
            <h2>Images</h2>
            <AddImage />
            <div className="images-container">
                {data && data.map(image => (
                    <div>
                        {image && <img src={image.url} alt="" />}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Images;