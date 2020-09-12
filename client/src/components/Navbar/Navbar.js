import React, { useState ,useContext } from 'react';
import {OwltalkContext} from '../../context/owltalkContext'
import { Navbar as Navbar2, 
         Nav, 
         NavbarBrand, 
         NavbarToggler, 
         Collapse,
         NavItem,
         NavLink,
         Container,
} from 'reactstrap'


const Navbar = () => {
   const owltalkContext = useContext(OwltalkContext)
   const {isLoggedIn, logout} = owltalkContext;
   const [isOpen, setIsOpen] = useState(false);
   const toggle = () => setIsOpen(!isOpen);

   function help(){
      alert('Welcome to Cheese! The site to help people connect during COVID. Create a User profile by selecting the user icon in the top left. To post a block click on the new block button. The main page displays recent and popular blocks from other students. The navigation bar links will help you navigate through different categories on the site. Thank you for becoming apart of the cheese family!')
   }

   return (
      <div>
      <Navbar2 color="dark" expand="md">
			<Container>
            {/* <!-- Login Button --> */}
            {isLoggedIn ? (
               <>
                  <button 
                     className="mr-3 button-style btn btn-info btn-sm" 
                     onClick={() => logout()}>logout</button>
                  {/* <!-- User Icon --> */}
                  <NavbarBrand href="profile?id=68464">
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  </NavbarBrand>
               </>
            ) : (
               <NavbarBrand className="button-style btn btn-info btn-sm" href="login" role="button">login</NavbarBrand>
            )}
            
            
            <NavbarBrand className="navbar-brand" href="/">Cheese</NavbarBrand>
            <NavbarToggler onClick={toggle}/>

            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-4 mr-auto" navbar>
                  <NavItem>
                     <NavLink className="nav-item nav-link" href="index">Home <span className="sr-only">(current)</span></NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink className="nav-item nav-link" href="people">People</NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink className="nav-item nav-link" href="major">Major</NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink className="nav-item nav-link" href="hobbie">Hobbies</NavLink>
                  </NavItem>
               </Nav>
               {/* <!-- Help Button --> */}
            <button type="button" className="button-style btn btn-info px-2" data-toggle="tooltip" data-placement="bottom" title="Click for help" onClick={help}>
            <i className="fa fa-question-circle" aria-hidden="true"></i>
            </button>
            </Collapse>
            
			</Container>
		</Navbar2>
      </div>
   );
}

export default Navbar;
