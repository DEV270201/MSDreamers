import React from 'react';
import '../css/global.css';
import '../css/landing.css';
import Navbar from './Navbar';
import Service from './Service';

const Landing = () => {

  const arr = [
    ["https://static.toiimg.com/thumb/msid-24183773,width-1070,height-580,resizemode-75,imgsize-24183773,pt-32,y_pad-40/24183773.jpg", "Forum", "Talk to other people!!"],
    ["https://st2.depositphotos.com/1105977/5461/i/600/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg", "Resources", "Free books!!"],
    ["https://st2.depositphotos.com/1105977/5461/i/600/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg", "Flashcards", "Learn new words!!"],
    ["https://st2.depositphotos.com/1105977/5461/i/600/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg", "Test papers", "Give online tests and practice your knowledge!!"]
  ]
  return(
    <div>
    <Navbar/>
    <div className="landing_img d-flex justify-content-center align-items-center" style={{width: "100vw",height:"100vh"}}>
      <h3 className="text-center ml-2 mr-2 tag_line" style={{color: "#fff",}}><i className="fas fa-quote-right icon_flip"></i> Dream with us today, we will help you achieve your dreams tomorrow <i class="fas fa-quote-right"></i></h3>
      <h6 className="author">~ MsDreamers</h6>
    </div>
    <h3 className="text-center mt-4 ml-3 mr-3">Why MSDreamers?</h3>
    <h5 className="text-center mt-2 ml-3 mr-3">Stop wandering around for your MS prep, your all round preparation kit is just one click away.</h5>
    {
    arr.map((service,index)=>{
        return <Service service={service} keys={index} key={index}/>
    })
    }
  </div>
  );
};

export default Landing;
