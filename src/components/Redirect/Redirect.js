import { useEffect } from "react";
import { useHistory } from "react-router-dom"

import "./Redirect.css"

const Redirect = () => {
    const history = useHistory()
    
    useEffect(() => {
        setTimeout(() => {
            history.push("/")
        }, 5000);
    }, [history])

    return ( 
        <div className="redirect-container">
            <h1>此網頁不存在</h1>
            <h2>您將被重定向到主頁...</h2>

        </div>
     );
}
 
export default Redirect;