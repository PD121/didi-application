import { useState } from "react";
import Modal from "./Modal";


const Blogs = ({blogPosts, addBlogPost}) => {
    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(!showModal)
    }
    
    return ( 
        <div>
            <button onClick={handleModal}>新文章</button>
            {blogPosts.map(blogPost => (
                <div key={blogPost.id}>
                    <h2>{blogPost.title}</h2>
                    <p>{blogPost.date}</p>
                    <p>{blogPost.body}</p>
                </div>
            ))}
            {showModal && <Modal handleModal={handleModal} addBlogPost={addBlogPost}/>}
        </div>
     );
}
 
export default Blogs;