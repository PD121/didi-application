import { useState } from "react";

import { projectFirestore } from '../../firebase/config'
import { projectStorage } from '../../firebase/config'

import './AddVideo.css'



const AddVideo = () => {
  const [video, setVideo] = useState(null);
  const [videoError, setVideoError] = useState('請選想要上傳的影片')



  // image input

  const handleFileChange = (e) => {
      setVideo(null)
      let selected = e.target.files[0]
      console.log(selected)
  
       if (!selected) {
        setVideoError('請選想要上傳的影片')
        return
      }
      if (!selected.type.includes('video')) {
        setVideoError('上傳的檔案必須得是.MP4影片')
        return
      }
      if (selected.size > 3000000) {
        setVideoError('上傳照片檔案的大小不能超過3MB')
        return
      }
      
      setVideoError(null)
      setVideo(selected)

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
        <div className="add-video-wrapper">
            <div>
              <h3>上傳影片</h3>
                <form onSubmit={submitForm}>
                    <label>
                        <input type="file" onChange={handleFileChange} id="upload-vid-file"/>
                    </label>
                    {video && !videoError && <button type="submit" className="btn" id="submit-vid-btn">上傳</button>}
                    {videoError && video && <button type="submit" className="btn" id="submit-vid-btn-disabled" disabled>上傳</button>}
                    {!video && <button type="submit" className="btn" id="submit-vid-btn-disabled" disabled>上傳</button>}
                    {videoError && <p className="add-video-error">{videoError}</p>}
                </form>
            </div>
        </div>
     );
}
 
export default AddVideo;