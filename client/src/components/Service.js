import React from 'react';

const Service = ({service,keys})=>{
    console.log(keys);
   
    return (
        <>
<div className="card mx-auto mb-3 mt-5 card_translation" style={{maxWidth: "85%"}}>
  <div className="row no-gutters">
    <div className={keys % 2 === 0 ? "col-md-4 order-md-2 order-sm-1" :"col-md-4 order-md-1 order-sm-1" }>
      <img className="service_img" src={service[0]} alt={service[1]}></img>
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

