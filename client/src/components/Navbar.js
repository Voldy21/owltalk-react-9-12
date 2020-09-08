import React, { useContext } from 'react';
import {OwltalkContext} from '../context/owltalkContext'

const Navbar = () => {
   const owltalkContext = useContext(OwltalkContext)
   const {isLoggedIn, logout} = owltalkContext;

   function help(){
      alert('Welcome to Cheese! The site to help people connect during COVID. Create a User profile by selecting the user icon in the top left. To post a block click on the new block button. The main page displays recent and popular blocks from other students. The navigation bar links will help you navigate through different categories on the site. Thank you for becoming apart of the cheese family!')
   }

   return (
      <nav className="navbar navbar-expand-lg">
			<div className="container">
            {/* <!-- Login Button --> */}
            {isLoggedIn ? (
               <button 
                  className="button-style btn btn-info btn-sm" 
                  onClick={() => logout()}>
                     logout
               </button>
            ) : (
               <a className="button-style btn btn-info btn-sm" href="login" role="button">login</a>
            )}
            
            {/* <!-- User Icon --> */}
            <nav className="navbar navbar-light">
               <a className="navbar-brand" href="profile.html">
               <i className="fa fa-user-circle-o" aria-hidden="true"></i>
               </a>
            </nav>
            <a className="navbar-brand" href="/">Cheese</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div className="navbar-nav">
                  <a className="nav-item nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                  <a className="nav-item nav-link" href="people.html">People</a>
                  <a className="nav-item nav-link" href="major.html">Major</a>
                  <a className="nav-item nav-link" href="hobbie.html">Hobbies</a>
               </div>
            </div>
            {/* <!-- Help Button --> */}
            <button type="button" className="button-style btn btn-info px-2" data-toggle="tooltip" data-placement="bottom" title="Click for help" onClick={help}>
            <i className="fa fa-question-circle" aria-hidden="true"></i>
            </button>
			</div>
		</nav>
   );
}

export default Navbar;
