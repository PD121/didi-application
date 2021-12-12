import { useState } from "react";
import "./Modal.css"

const Modal = ({handleModal, addBlogPost}) => {
    const [title,setTitle] = useState("");
    const [date, setDate] = useState("");
    const [body, setBody] = useState("");

    const resetForm = () => {
        setTitle("")
        setDate("")
        setBody("")
    }

    const submitForm = (e) => {
        e.preventDefault();
        let newBlogPost = {
            id: Math.floor(Math.random() * 10000),
            title: title,
            date: date,
            body: body
        }
        addBlogPost(newBlogPost)
        resetForm();
        handleModal()
    }
    
    return ( 
        <div className="modal-backdrop">
            <div className="modal">
                <h2>新文章</h2>
                <button className="close-btn" onClick={handleModal}>✕</button>
                <form onSubmit={submitForm}>
                    <label>
                        <span>標題</span>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
                    </label>
                    <label>
                        <span>日期</span>
                        <input type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
                    </label>
                    <label>
                        <span>主體</span>
                        <textarea rows="10"onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default Modal;