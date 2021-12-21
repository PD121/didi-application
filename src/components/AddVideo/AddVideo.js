import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'



const AddVideo = () => {
  const [video, setVideo] = useState(null);
  const [videoError, setVideoError] = useState(null)


  const history = useHistory()



  // image input

  const handleFileChange = (e) => {
      setVideo(null)
      let selected = e.target.files[0]
      console.log(selected)
  
/*       if (!selected) {
        setVideoError('Please select a file')
        return
      }
      if (!selected.type.includes('video')) {
        setVideoError('Selected file must be a video')
        return
      }
      if (selected.size > 10000000000) {
        setVideoError('Video file size must be less than 100kb')
        return
      } */
      
      setVideoError(null)
      setVideo(selected)
      console.log('thumbnail updated')

    }
    // End image input


    let doc; 

  const submitForm = async (e) => {
      e.preventDefault()


     //UPLOAD IMAGE
      let uploadPath = await `videos/${video.name}`
      const vid = await projectStorage.ref(uploadPath).put(video)
      const vidURL = await vid.ref.getDownloadURL()

      doc = ({ url: vidURL })

      try {
          await projectFirestore.collection("videos").add(doc)
      } catch (err) {
          console.log(err)
      }
  }
    return ( 
        <div className="add-blog-wrapper">
            <div>
                <form onSubmit={submitForm}>
                    <label>
                        <input type="file" onChange={handleFileChange}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default AddVideo;