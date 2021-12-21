import './Cover.css'
import { NavLink } from 'react-router-dom';

const Cover = () => {
    return ( 
        <div className="navbar">
            <img src="/img/avatar2.png" alt=''className="avatar"/>
            <img src="/img/logo.png" alt=''className="logo"/>
            <header className="header">
                <NavLink exact to="/">主頁</NavLink>
                <NavLink to="/images">照片</NavLink>
                <NavLink to="/videos">影片</NavLink>
                <NavLink to="/blogs">部落格</NavLink>
                <NavLink to="/contact">聯繫方式</NavLink>
            </header>
        </div>
       /*  <div className="cover">
            <img src="/img/cover.jpg" alt=''/>
        </div> */
     );
}
 
export default Cover;