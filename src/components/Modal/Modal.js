import { useState } from "react";
import "./Modal.css"

const Modal = ({ handleModal, handleDelete }) => {
    
    return ( 
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close-btn" onClick={handleModal}>✕</button>
                <h2>Are you sure you want to delete the blog?</h2>
                <button onClick={handleDelete}>Submit</button>
            </div>
        </div>
     );
}
 
export default Modal;