import AddVideo from "../../components/AddVideo/AddVideo";

import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from "react";

import "./Videos.css"

import Trashcan from "../../assets/trashcan.svg"

import { useAuthContext } from "../../hooks/useAuthContext"





const Videos = () => {
        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(false);
        const [error, setError] = useState(false)

        const { user } = useAuthContext();

        const handleDelete = (id) => {
            projectFirestore.collection("videos").doc(id).delete()
        }
    
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
        <div className="video-page-wrapper">
            <h1>影片</h1>
            {user && <AddVideo />}
            <div className="videos-container">
                {data && data.map(video => (
                    <div className="video-wrapper" key={video.id}>
                        {video && user && <img src={Trashcan} alt="" className="delete-icon" onClick={() => handleDelete(video.id)}/>}
                        {video && <video src={video.url} controls className="video"></video>}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Videos;