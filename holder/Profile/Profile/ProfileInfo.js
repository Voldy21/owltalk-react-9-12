import React, { useEffect } from 'react';
import { Col } from 'reactstrap'
import { useParams } from "react-router"
import axios from 'axios'

const ProfileInfo = (props) => {
   // const [data, setData] = useState({})
   let { id } = useParams()
   
   useEffect(() => {
      
      (async () => {
         await axios.get(`/api/profile/user/${id}`)

      })()

   }, [id])

   return (
      <Col md="5" className="overflow-auto p-0" >
         <div id="userProfile" className="card" style={{width: "18rem"}}>
            <img src="assets/1.jpg" className="card-img-top" alt="..."/>
            <div className="card-body">
               <h5 className="card-title">Firstname LastName</h5>
            </div>
            <ul className="list-group list-group-flush">
               <li id="location" className="list-group-item">Location: </li>
               <li id="major" className="list-group-item">Major: </li>
               <li id="hobbies" className="list-group-item">Hobbies: </li>
            </ul>
            {/* <!-- Create a new block button with modal --> */}
            <button type="button" className="button-style btn btn-info btn-sm" id="updateProfileButton" data-toggle="modal" data-target="#updateProfile">Edit Profile</button>
         </div>
		</Col>
   );
}

export default ProfileInfo;
