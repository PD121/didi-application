import './BlogsList.css';
import { Link } from "react-router-dom";


const BlogsList = ({ blogPosts }) => {

    return ( 
        <>
            {blogPosts.map(blogPost => (
                <Link to={`/blogs/${blogPost.id}`} className="blog-card-wrapper" key={blogPost.id}>
                    <div className="blog-card">
                            <h2>{blogPost.title}</h2>
                            <p>{blogPost.date}</p>
                            <p>{blogPost.body.slice(0,50)}...</p>
                            <p>閱讀更多...</p>
                    </div>
                </Link>
                ))}
        </>
     );
}
 
export default BlogsList;