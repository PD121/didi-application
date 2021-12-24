import AddImage from "../../components/AddImage/AddImage";


import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from "react";

import "./Images.css"

import Trashcan from "../../assets/trashcan.svg"

import { useAuthContext } from "../../hooks/useAuthContext"






const Images = () => {
        // const { data: blogPosts, isPending, error } = useFetch("http://localhost:3000/blogs")
        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(false);
        const [error, setError] = useState(false)

        const { user } = useAuthContext();

        
    
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

        const handleDelete = (id) => {
            projectFirestore.collection("images").doc(id).delete()
        }

    return ( 
        <div className="image-page-wrapper">
            <h1>照片</h1>
            <AddImage />
            <div className="images-container">
                {data && data.map(image => (
                    <div className="image-wrapper" key={image.id}>
                        {image && user && <img src={Trashcan} alt="" className="delete-icon" onClick={() => handleDelete(image.id)}/>}
                        {image && <img src={image.url} alt="" className="image" />}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Images;