import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'



import "./AddBlog.css"

const AddBlog = () => {
    const [title,setTitle] = useState("");
    const [date, setDate] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(null)


    const history = useHistory()


    const resetForm = () => {
        setTitle("")
        setDate("")
        setBody("")
    }


    // image input

    const handleFileChange = (e) => {
        setImage(null)
        let selected = e.target.files[0]
        console.log(selected)
    
        if (!selected) {
          setImageError('Please select a file')
          return
        }
        if (!selected.type.includes('image')) {
          setImageError('Selected file must be an image')
          return
        }
        if (selected.size > 100000000) {
          setImageError('Image file size must be less than 100kb')
          return
        }
        
        setImageError(null)
        setImage(selected)
        console.log('thumbnail updated')

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
                        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
                    </label>
                    <label>
                        <span>日期</span>
                        <input type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
                    </label>
                    <label>
                        <span>主體</span>
                        <textarea rows="10" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
                    </label>

                    <label>
                        <input type="file" accept="image/*" onChange={handleFileChange}/>
                    </label>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default AddBlog;