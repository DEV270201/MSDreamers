import React from "react";
import "../css/Footer.css";

const Footer = ()=>{
  return(
  <>
   <div className="footer_container mt-3">
     {/* <div className="footer_subscriptions">
         <p className="footer_subscriptions_head"> Subscribe to our website for more amazing and beautiful rentals! </p>
         <p className="footer_subscriptions_para"> You can subscribe anytime if you want</p>
         <div className="inputs">
                <input className="input_field" type="text" placeholder="Write Something..." />
                <button className="btn btn-outline-success mybtn">Subscribe</button>
         </div>
     </div> */}
     
     <div className="social_media">
         <div className="social_media_wrap">
             <div className="social_icons">
                 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social_media_icon instagram"><i className="fab fa-instagram"></i></a>
                 <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="social_media_icon facebook"><i className="fab fa-facebook"></i></a>
                 <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social_media_icon twitter"><i className="fab fa-twitter"></i></a>
             </div>
         </div>
     </div>
     <div>
         <p className="text-center">Copyrights © {new Date().getFullYear()} MSDreamers. All Rights Reserved</p>
     </div>
   </div>
  </>
  );
}

export default Footer;