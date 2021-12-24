import './Footer.css';

import Dog from "../../assets/dog.svg"




const Footer = () => {

    return ( 
        <footer className="footer">
            <p>&copy; Copyright 2021 我是DiDi</p>
            <p>臺灣 ♡</p>
            <img src={Dog} alt="" />
        </footer>
     );
}
 
export default Footer;