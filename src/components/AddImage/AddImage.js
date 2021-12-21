import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'



const AddImage = () => {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null)


  const history = useHistory()



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
      } catch (err) {
          console.log(err)
      }
  }
    return ( 
        <div className="add-blog-wrapper">
            <div>
                <form onSubmit={submitForm}>
                    <label>
                        <input type="file" accept="image/*" onChange={handleFileChange}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default AddImage;