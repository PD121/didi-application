
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react"
import "./BlogDetails.css"

import { projectFirestore } from '../../firebase/config'
import Modal from "../../components/Modal/Modal";




const BlogDetails = () => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const { id } = useParams()
   // const { data: blogPost, isPending, error } = useFetch("http://localhost:3000/blogs/" + id)
    const history = useHistory()

    useEffect(() => {
        setIsPending(true)

        projectFirestore.collection("blogposts").doc(id).get().then((doc) => {
            if (doc.exists) {
                setIsPending(false)
                setData(doc.data())
            } else {
                setIsPending(false)
                setError("Could not find that blog post")
            }
        })

    }, [id])

    useEffect(() => {
        if(error){
            setTimeout(() => {
                history.push("/blogs")
            }, 5000);
        }
    }, [error, history])

    const handleGoBack = () => {
        history.push("/blogs")
    }

    const handleDelete = () => {
        projectFirestore.collection("blogposts").doc(id).delete()
        handleGoBack()
    }

    const handleModal = () => {
        setShowModal(!showModal)
    }

    return (  
        <div>
            <div className="btn-wrapper">
                <button className="return-btn" onClick={handleGoBack}>Go back</button>
                <button className="delete-btn" onClick={handleModal}>Delete Blog</button>
                <button className="edit-btn">Edit Blog</button>

            </div>

            {isPending && <p>Loading blog post...</p>}
            {error && <p>{error}</p>}

            {data && <div>
                <h2>{data.title}</h2>
                <p>{data.date}</p>
                <p>{data.body}</p>
                <img src={data.image} alt="" />
            </div>}

            {showModal && <Modal handleModal={handleModal} handleDelete={handleDelete} />}

        </div>
    );
}
 
export default BlogDetails;