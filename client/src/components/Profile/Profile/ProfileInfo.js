import React from 'react';
import { Col } from 'reactstrap'
import ProfileModal from './ProfileModal'

const ProfileInfo = ({hasProfile, img, location, major, hobbies, name, onChange, onSubmit}) => {

   if(typeof hobbies == "object"){
      hobbies = hobbies.join(", ")
   }

   return (
      <Col md="5" className="overflow-auto p-0" >
         {hasProfile ? (<div id="userProfile" className="card" style={{width: "18rem"}}>
            <img src={img} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{name}</h5>
            </div>
            <ul className="list-group list-group-flush">
            <li id="location" className="list-group-item">Location: {location}</li>
            <li id="major" className="list-group-item">Major: {major}</li>
            <li id="hobbies" className="list-group-item">Hobbies: {hobbies}</li>
            </ul>
            {/* <!-- Create a new block button with modal --> */}
            {/* <!-- Create a new block button with modal --> */}
            <ProfileModal
               onChange={onChange}
               onSubmit={onSubmit}
               major={major}
               hobbies={hobbies}
               location={location}
               name={name}
               buttonLabel="Edit Profile"/>
         </div>) : 
         (
            <div id="userProfile" className="card" style={{width: "18rem"}}>
               <img src="https://gravatar.com/avatar/96a4358980c143b94f8b777367bad3fa?d=mm&r=pg&s=200" className="card-img-top" alt="..."/>
               <div className="card-body">
                  <h5 className="card-title">User</h5>
               </div>
               <ul className="list-group list-group-flush">
                  <li id="location" className="list-group-item">Location:</li>
                  <li id="major" className="list-group-item">Major:</li>
                  <li id="hobbies" className="list-group-item">Hobbies:</li>
               </ul>
               {/* <!-- Create a new block button with modal --> */}
               <ProfileModal
               onChange={onChange}
               onSubmit={onSubmit}
               major={major}
               hobbies={hobbies}
               location={location}
               name={name}
               buttonLabel="Edit Profile"/>

            </div>
         )

         }
         
		</Col>
   );
}

export default ProfileInfo;
