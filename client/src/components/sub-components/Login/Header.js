import React from 'react';

const Header = (props) => {
   return (
      <section>
            <div className="container text-center" style={{paddingTop: "50px"}}>
               <h2 style={{paddingBottom: "25px"}}>Cheese</h2>
               <figure className="figure">
                  <i className="fa fa-grav" 
                  aria-hidden="true" 
                  style={{fontSize: "10em"}}></i>
               </figure>
               <h3 style={{paddingTop: "25px"}}>
                  {props.text}
               </h3>
            </div>
         </section>
   );
}

export default Header;
