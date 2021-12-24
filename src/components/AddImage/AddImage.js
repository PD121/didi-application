import { useState } from "react";

import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'

import { useAuthContext } from "../../hooks/useAuthContext"


import "./AddImage.css"



const AddImage = () => {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState('請選想要上傳的相片或gif')
  const { user } = useAuthContext();



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


    let doc; 

  const submitForm = async (e) => {
      e.preventDefault()


     //UPLOAD IMAGE
      let uploadPath = await `images/images/${image.name}`
      const img = await projectStorage.ref(uploadPath).put(image)
      const imgURL = await img.ref.getDownloadURL()

      doc = ({ url: imgURL })

      try {
          await projectFirestore.collection("images").add(doc)
          await setImage(null)
      } catch (err) {
          console.log(err)
      }
  }
    return (
      <>
        {user && (
        <div className="add-img-wrapper">
            <div>
                <h3>上傳相片</h3>
                <form onSubmit={submitForm}>
                    <label>
                        <input type="file" accept="image/*" onChange={handleFileChange} id="upload-img-file" />
                    </label>
                    {image && !imageError && <button type="submit" className="btn" id="submit-img-btn">上傳</button>}
                    {imageError && image && <button type="submit" className="btn" id="submit-img-btn-disabled" disabled>上傳</button>}
                    {!image && <button type="submit" className="btn" id="submit-img-btn-disabled" disabled>上傳</button>}
                    {imageError && <p className="add-image-error">{imageError}</p>}
                </form>
            </div>
        </div>
        )}
      </>
     );
}
 
export default AddImage;