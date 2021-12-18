import React from 'react';
import '../css/global.css';
import '../css/landing.css';
import Service from './Service';
import Arr from '../data/serviceData';
import Footer from './Footer';

const Landing = () => {



  return(
    <div>
    <div className="landing_img d-flex justify-content-center align-items-center" style={{width: "100vw",height:"100vh"}}>
      <h3 className="text-center ml-2 mr-2 tag_line" style={{color: "#fff",}}><i className="fas fa-quote-right icon_flip"></i> Dream with us today, we will help you achieve your dreams tomorrow <i className="fas fa-quote-right"></i></h3>
      <h6 className="author">~ MsDreamers</h6>
    </div>
    <h3 className="text-center mt-4 ml-3 mr-3">Why MSDreamers?</h3>
    <h5 className="text-center mt-2 ml-3 mr-3">Stop wandering around for your MS prep, your all round preparation kit is just one click away.</h5>
    {
    Arr.map((service,index)=>{
        return <Service service={service} keys={index} key={index}/>
    })
    }
    <Footer/>
  </div>
  );
};

export default Landing;
