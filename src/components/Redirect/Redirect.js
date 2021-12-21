import { useEffect } from "react";
import { useHistory } from "react-router-dom"

const Redirect = () => {
    const history = useHistory()
    
    useEffect(() => {
        setTimeout(() => {
            history.push("/")
        }, 5000);
    }, [history])

    return ( 
        <div>
            <h2>This page does not exist.</h2>
            <h2>You will be redirected to the home page...</h2>

        </div>
     );
}
 
export default Redirect;