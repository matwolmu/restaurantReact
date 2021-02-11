import {useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import {AuthContext} from '../context/auth';
import logo from '../chefHat.jpg';




function Navbar (){
    const history = useHistory();
    const context = useContext(AuthContext)
    const [aboutPageActive, setAboutPageActive] = useState(false)


    useEffect(() => {
      context.setActiveMenuItem("manage")
    }, [])

    useEffect(() => {
      context.activeMenuItem === "manage" && history.push('/management')
      context.activeMenuItem === "add" && history.push('/addDish')
      context.activeMenuItem === "stats" && history.push('/stats')

    }, [context.activeMenuItem])




    const handleLogin = (e) => {
        e.preventDefault()
        history.push('/login')
        setAboutPageActive(false)
    }

    const handleLogout = (e) => {
      e.preventDefault()
      if(localStorage.getItem('jwt')){
        console.log("jwt found")
        localStorage.removeItem('jwt');
        context.logout()
      }else{
        console.log("should have a jwt")
      }
      context.setActiveMenuItem("manage")
      history.push('/')
      setAboutPageActive(false)
    }

    const handleAbout = (e) => {
      e.preventDefault()
      context.logout()
      if(aboutPageActive){
        setAboutPageActive(false)
        history.push('/')
        context.logout()
      } else {
        setAboutPageActive(true)
        history.push('/about')
      }
      
  }



// <a href="#" className="brand-logo">Logo</a>

    return (
        

    <div>
      <nav className="nav-extended  teal lighten-1" id="navbar">
        <div className="nav-wrapper">
          
         
          <ul id="nav-mobile" className="right ">
            <li ><a href=""  onClick={handleAbout}>{aboutPageActive ? "Back to Menu" : "About this Project"}</a></li>      
            <li>
              {context.user ? 
                <a href=""  onClick={handleLogout}>Logout</a> 
                : // else
                <a href=""  onClick={handleLogin}>Login</a> }
            </li>
          </ul>
        </div>
      
      {context.user ? 
      // show sub menu
        <div className="nav-content">
        <ul className="tabs tabs-transparent " style={{display: "flex", justifyContent: "center"}}>

        <li className="tab">
            <a onClick={(e) => context.setActiveMenuItem("manage")}
              className={context.activeMenuItem === "manage" ? "active" : ""} >
              Manage Dishes
            </a>
          </li>

          <li className="tab">
            <a onClick={(e) => context.setActiveMenuItem("add")}
              className={context.activeMenuItem === "add" ? "active" : ""} >
              Add Dish
            </a>
          </li>

          <li className="tab">
            <a onClick={(e) => context.setActiveMenuItem("stats")}
              className={context.activeMenuItem === "stats" ? "active" : ""} >
              Stats
            </a>
          </li>

        </ul>
      </div>  : <div></div> }  
      
    </nav>



  </div>


        
      );
}


export default Navbar;