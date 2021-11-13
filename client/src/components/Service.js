import React,{useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000,
})

const Service = ({service,keys})=>{

    // useEffect(()=>{
    // let card = document.querySelector(".card"+String(keys));
    // console.log("useeffect");
    
    //   const checkInViewPort = ()=>{
    //     console.log("key : " + keys + " top : " + card.getBoundingClientRect().top);
    //     return card.getBoundingClientRect().top <= (window.innerHeight||document.documentElement.clientHeight);  //will return true if the element is present in the viewport or not
    //   }

    //   const animate = ()=>{
    //     // console.log("hello");
    //       if(checkInViewPort()){
    //         console.log(keys);
    //         displayCard();
    //       } 
    //       else {
    //         removeCard();
    //       }
    //   }

      // const displayCard = () => {
      //   if (true){ // If odd then card will appear from left
      //     card.classList.add('left_animate')  // Adding animation class to card
      //   } else {
      //     card.classList.add('left_animate')
      //   }
      // }

      // const removeCard = () => {
      //   if (true){ // If odd then card will appear from left
      //     card.classList.remove('left_animate')  // Adding animation class to card
      //   } else {
      //     card.classList.remove('left_animate')
      //   }
      // }

  //     window.addEventListener("scroll",animate);
      
  //     return(()=>{
  //       console.log("removed");
  //      window.removeEventListener("scroll",animate);
  //     });
 
  //  },[keys]);
   
return (
        <>
<div data-aos={keys % 2 === 0 ? "fade-right" :"fade-left" } className="card mx-auto mb-3 mt-5" style={{maxWidth: "85%"}}>
  <div className="row no-gutters">
    <div className={keys % 2 === 0 ? "col-md-4 order-md-2 order-sm-1" :"col-md-4 order-md-1 order-sm-1" }>
      <img className="service_img" src={service[0]} alt={service[1]} style={{height: '250px'}}></img>
    </div>
    <div className={keys % 2 === 0 ? "col-md-8 order-md-1 order-sm-2" :"col-md-8 order-md-2 order-sm-2" }>
      <div className="card-body">
        <h5 className="card-title service_title">{service[1]}</h5>
        <p className="card-text service_desc">{service[2]}</p>
      </div>
    </div>
  </div>
</div>
        </>
    );
}

export default Service;

