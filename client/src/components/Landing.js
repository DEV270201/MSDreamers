import React from 'react';
import '../css/global.css';
import Navbar from './Navbar';

const Landing = () => {
  return(
    <div>
    <Navbar/>
    <div className="landing_img d-flex justify-content-center align-items-center" style={{width: "100vw",height:"100vh"}}>
      <h3 className="text-center" style={{color: "#fff"}}><i class="fas fa-quote-left"></i>Dream with us today, we will help you achieve your dreams tomorrow!<i class="fas fa-quote-right"></i></h3>
    </div>
    {/* <img src="https://images.unsplash.com/photo-1592819695396-064b9572a660?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" class="img-fluid min-100-vh" style={{width: "100%",height: "100%"}}></img> */}
  </div>
  );
};

export default Landing;
