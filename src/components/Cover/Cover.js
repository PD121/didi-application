import './Cover.css'
import { NavLink } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext"
import User from "../../assets/user.svg"




const Cover = () => {
    const { user } = useAuthContext();
 

const handleTab = (e) => {
    console.log(e)
}

    
    return ( 
        <div className="navbar">
            <img src="/img/avatar2.png" alt=''className="avatar"/>
            <img src="/img/logo.png" alt=''className="logo"/>
            <header className="header">
                <NavLink exact to="/" className="tab" onClick={handleTab}>主頁</NavLink>
                <NavLink to="/blogs" className="tab" onClick={handleTab}>部落格</NavLink>
                <NavLink to="/images" className="tab" onClick={handleTab}>照片</NavLink>
                <NavLink to="/videos" className="tab" onClick={handleTab}>影片</NavLink>
                <NavLink to="/contact" className="tab" onClick={handleTab}>聯繫方式</NavLink>
            </header>

            {user && (<div className="user-wrapper">
                
                <p className="user">{user.displayName}<img src={User} className="user-icon" alt=""/></p>
            </div>
            )}

        </div>
       /*  <div className="cover">
            <img src="/img/cover.jpg" alt=''/>
        </div> */
     );
}
 
export default Cover;