import { useState } from "react";
import { useHistory } from "react-router-dom"

import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'



import "./AddBlog.css"

const AddBlog = () => {
    const [title,setTitle] = useState("");
    const [date, setDate] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('請選想要上傳的相片或gif')


    const history = useHistory()


    // image input

    const handleFileChange = (e) => {
        setImage(null)
        let selected = e.target.files[0]
        console.log(selected)
        
    
        if (!selected) {
          setImageError('請選想要上傳的相片或gif')
          return
        }
        if (!selected.type.includes('image')) {
          setImageError('上傳的檔案必須得是照片或gif')
          return
        }
        if (selected.size > 600000) {
          setImageError('上傳照片檔案的大小不能超過600kb')
          return
        }
        
        setImageError(null)
        setImage(selected)

      }
      // End image input



    const submitForm = async (e) => {
        e.preventDefault()

        let doc; 

       //UPLOAD IMAGE
        let uploadPath = await `images/blogs-section/${image.name}`
        const img = await projectStorage.ref(uploadPath).put(image)
        const imgURL = await img.ref.getDownloadURL()

        doc = ({ title, date, body, image: imgURL })

        try {
            await projectFirestore.collection("blogposts").add(doc)
            history.push("/blogs")
        } catch (err) {
            console.log(err)
        }
    }


    return ( 
        <div className="add-blog-wrapper">
            <div>
                <h2>新文章</h2>
                <form onSubmit={submitForm}>
                    <label>
                        <span>標題</span>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="text-input"/>
                    </label>
                    <label>
                        <span>日期</span>
                        <input type="date" onChange={(e) => setDate(e.target.value)} value={date} className="text-input"/>
                    </label>
                    <label>
                        <span>主體</span>
                        <textarea rows="15" onChange={(e) => setBody(e.target.value)} value={body} className="text-input"></textarea>
                    </label>

                    <label>
                        <input type="file" accept="image/*" onChange={handleFileChange} id="file-upload-input-blog"/>
                    </label>

                    {image && !imageError && <button type="submit" className="submit-blog-btn">提交</button>}
                    {imageError && image && <button type="submit" className="submit-blog-btn-disabled" disabled>提交</button>}
                    {!image && <button type="submit" className="submit-blog-btn-disabled" disabled>提交</button>}
                    {imageError && <p className="image-error">{imageError}</p>}
                </form>
            </div>
        </div>
     );
}
 
export default AddBlog;