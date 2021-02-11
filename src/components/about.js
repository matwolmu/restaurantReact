import React from 'react';
import Diagram from '../diagram.png';



function About() {











  return (
    <div className="container wrapToCenter" id="aboutPage">
      <div>
          <img src={Diagram} alt="Logo" style={{marginTop: "20px"}} />
      </div>
      <div>
        <p>Github Frontend: <a href="https://github.com/matwolmu/restaurantFrontend.git" target="_blank" >https://github.com/matwolmu/restaurantFrontend.git</a></p>
        <p>Github Backend:  <a href="https://github.com/matwolmu/restaurantBackendJS"  target="_blank" >https://github.com/matwolmu/restaurantBackendJS</a></p>
      </div>
        
    </div>
  );
}



export default About;