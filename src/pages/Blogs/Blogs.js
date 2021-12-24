import BlogsList from "../../components/BlogsList/BlogsList";
import './Blogs.css';
//import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom"

import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext"



const Blogs = () => {
    // const { data: blogPosts, isPending, error } = useFetch("http://localhost:3000/blogs")
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false)
    const { user } = useAuthContext();

    useEffect(() => {
        setIsPending(true)

        const unsub = projectFirestore.collection("blogposts").onSnapshot((snapshot) => {
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
        <div className="blog-page-wrapper">
            <h1>部落格</h1>
            {user && (
                <Link to="/addblog">
                    <button className="btn" id="add-blog-btn">新文章</button>
                </Link>
            )}

            {isPending && <p>Loading blog posts...</p>}
            {error && <p>{error}</p>}

            <div className="blog-prevs-ctn">
                {data && <BlogsList blogPosts={data}/>}
            </div>
        </div>
     );
}
 
export default Blogs;