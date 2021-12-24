import "./Modal.css"

const Modal = ({ handleModal, handleDelete }) => {
    
    return ( 
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close-btn" onClick={handleModal}>✕</button>
                <h3>你是否確定要刪除此文章？</h3>
                <button onClick={handleDelete} className="modal-submit-btn">確定</button>
            </div>
        </div>
     );
}
 
export default Modal;