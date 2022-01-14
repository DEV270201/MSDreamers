import React from 'react';
import priyal from "../img/priyal.jpg";
import devansh from "../img/devansh.jpeg";
import "../css/About.css";

const About = () => {
  return (
    <>
      <br></br>
      <div className="container padding-c mt-3" >
        <div className="jumbotron " style={{ background: '#161b22' }}>
          <div className="bio">
            <img src="/media/logo.jpeg" width="300px" className="logo" alt="Logo" />
            <p className="para text-center"><span id="abc"><i className="fas fa-quote-left"></i></span>  MsDreamers will help you in cracking one of the most difficult entrance exams for pursuing Masters in your dream university.We will be in touch with you for future oppportunites and career news that you might find interesting.<span id="abc"><i className="fas fa-quote-right"></i></span></p>
          </div>
          <hr className="mt-1" style={{ background: 'white' }}></hr>
        </div>
      </div>
      <div className="album py-3 mb-5">
        <div className="container">
          <h2 className="text-center">Meet The Developers!</h2>
          <hr></hr>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-lg-4 col-sm-6 col-10 d-flex align-items-stretch">
              <div className="card shadow-sm">
                <img src={priyal} className="card-img-top img-height" alt="..." style={{ maxHeight: '300px' }} />
                <div className="card-body">
                  <h5 className="card-title">Priyal Babel</h5><hr></hr>
                  <p className="card-text">Third Year Computer Engineering student from K. J. Somaiya College Of Engineering.</p>
                  <div className="row">
                    <div className="col text-center">
                      <i className="fa fa-brands fa-whatsapp"><a href="https://wa.me/918976514635?text=Hey!%20I%20would%20like%20to%20connect%20with%20you%20regarding%20your%20website"> </a></i>
                    </div>
                    <div className="col text-center">
                      <i className="fa fa-brands fa-linkedin"><a href="https://www.linkedin.com/in/priyal-babel/"> </a></i>
                    </div>
                    <div className="col text-center">
                      <a href="mailto:priyalbabel@gmail.com"><i className="fa fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-sm-6 col-10 d-flex align-items-stretch">
              <div className="card shadow-sm">
                <img src={devansh} className="card-img-top img-height" alt="Cannot load" style={{ maxHeight: '300px' }} />
                <div className="card-body">
                  <h5 className="card-title">Devansh Shah</h5><hr></hr>
                  <p className="card-text">Third Year Computer Engineering student from K. J. Somaiya College Of Engineering.</p>
                  <div className="row">
                    <div className="col text-center">
                      <i className="fa fa-brands fa-whatsapp"><a href="https://wa.me/918767036024?text=Hey!%20I%20would%20like%20to%20connect%20with%20you%20regarding%20your%20website"> </a></i>
                    </div>
                    <div className="col text-center">
                      <i className="fa fa-brands fa-linkedin"><a href="https://www.linkedin.com/in/devansh-shah-6162841a4/"> </a></i>
                    </div>
                    <div className="col text-center">
                      <a href="mailto:devanshshah649@gmail.com"><i className="fa fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;