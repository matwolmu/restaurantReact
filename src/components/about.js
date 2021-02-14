import React from 'react';
import Diagram from '../diagram.png';



function About() {











  return (
    <div className="container wrapToCenter" id="aboutPage">
      <div>
          <img src={Diagram} alt="Logo" style={{marginTop: "20px"}} className="show-on-medium-and-up hide-on-small-only"  />
          <img src={Diagram} alt="Logo" style={{marginTop: "20px", width: "400px"}} className="show-on-small hide-on-med-and-up"  />
      </div>
      <div>
        <p>Github Frontend: <a href="https://github.com/matwolmu/restaurantReact/" target="_blank" >https://github.com/matwolmu/restaurantFrontend</a></p>
        
        <p>Github Backend:  <a href="https://github.com/matwolmu/restaurantBackendJS/"  target="_blank" >https://github.com/matwolmu/restaurantBackendJS</a></p>
      </div>
        
    </div>
  );
}



export default About;