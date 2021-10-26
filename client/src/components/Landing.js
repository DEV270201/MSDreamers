import React from 'react';
import '../css/global.css';
import Navbar from './Navbar';

const Landing = () => {
  return(
    <div>
    <Navbar/>
    
    <img src="https://images.unsplash.com/photo-1592819695396-064b9572a660?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" class="img-fluid" style={{width: "100%", height: "100%"}}></img>
  </div>
  );
};

export default Landing;
