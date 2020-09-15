import React, { useState, useContext, useEffect } from 'react';
import ProfileInfo from './Profile/ProfileInfo'
import ProfilePosts from './Profile/ProfilePosts'
import { Container, Row} from 'reactstrap'
import { useParams } from "react-router"
import axios from 'axios'
import {OwltalkContext} from '../../context/owltalkContext'
import Cookies from 'universal-cookie'

const Profile = () => {
	const owltalkContext = useContext(OwltalkContext)
   const {setAlert} = owltalkContext
   const [posts, setPosts] = useState(null)
   const [major, setMajor] = useState("")
   const [hobbies, setHobbies] = useState([])
   const [location, setLocation] = useState("")
   const [name, setName] = useState("")
   const [update, setUpdate] = useState("")
   const [hasProfile, setHasProfile] = useState(false)
   const [img, setImg] = useState("https://gravatar.com/avatar/96a4358980c143b94f8b777367bad3fa?d=mm&r=pg&s=200")
   let { id } = useParams()
   
   useEffect(() => {
      axios.get(`http://localhost:5000/api/profile/user/${id}`)
         .then(res => {
            setName(res.data.profile.name)
            setHobbies(res.data.profile.hobbies)
            setLocation(res.data.profile.location)
            setImg(res.data.profile.user.avatar)
            setMajor(res.data.profile.major)
            setHasProfile(true)
            setPosts(res.data.posts)
            
         })
         .catch(error => {
            if(error.response){
               setAlert(error.response.data, "danger")
            }
         })
   }, [id, update])

   const onSubmit = (e) => {
      e.preventDefault()
      const cookies = new Cookies()
      let token = cookies.get('token')
       axios({
         method: "post", url: "http://localhost:5000/api/profile",
         data: {
            location,
            major,
            hobbies,
            name
         },
         headers: {
            "x-auth-token": token
         }
      }).catch(error => {
         if(error.response){
            console.log(error.response.data);
         }
      })
      setUpdate("alskdj")
      setUpdate("")
      setHobbies("")
      setMajor("")
      setName("")
      setLocation("")
      window.location.reload()
   }

   const onChange = (e)=> {
      let name = e.currentTarget.name
      let value = e.currentTarget.value
      name === "location" ? setLocation(value) : name === "major" ? setMajor(value) : name === "name" ? setName(value) : setHobbies(value)
   }


   return (
      <Container>
			<Row>
            <ProfileInfo 
            hasProfile={hasProfile}
            img={img}
            location={location}
            major={major}
            hobbies={hobbies}
            name={name}
            onChange={onChange}
            onSubmit={onSubmit}
            />
				<ProfilePosts name={name} posts={posts}/>
			</Row>
		</Container>
   );
}

export default Profile;
