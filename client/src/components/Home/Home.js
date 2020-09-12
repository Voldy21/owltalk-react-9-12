import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {OwltalkContext} from '../../context/owltalkContext'
import { Container } from 'reactstrap'
import Cookies from 'universal-cookie'
import PostContainer from './PostContainer'
import PostModal from './PostModal'



const Home = () => {
   const owltalkContext = useContext(OwltalkContext)
   const {isLoggedIn} = owltalkContext
   const [posts, setPosts] = useState([])
   const [update, setUpdate] = useState(false)
   const [title, setTitle] = useState("")
   const [text, setText] = useState("")
   
   useEffect(() => {
         axios.get("api/posts")
            .then(res => setPosts(res.data))
   }, [update])

   const onSubmit = async (e) => {
      e.preventDefault()
      let title = e.target.querySelector("#title").value
      let text = e.target.querySelector("#body").value
      if(title !== "" && text !== ""){
         const cookies = new Cookies()
         let token = cookies.get('token')
        
         await axios({
            method: "post", url: "api/posts",
            data: {
               title,
               text
            },
            headers: {
               "x-auth-token": token
            }
         })
      }
      setUpdate("alskdj")
      setUpdate("")
      setTitle("")
      setText("")
   }

   const onChange = (e)=> {
      let name = e.currentTarget.name
      let value = e.currentTarget.value
      name === "text" ? setText(value) : setTitle(value)
   }

   return (
      
      // <!-- Main Block Section -->
		<Container className="text-center">
         {
         posts === null ? (<p>Loading</p>) : 
         posts.length === 0 && isLoggedIn ? (
            <PostModal 
            onChange={onChange}
            onSubmit={onSubmit} 
            title={title}
            text={text}
            buttonLabel="Create Post"
            />) :
         (
            <>
               {/* <!-- Create a new block button with modal --> */}
               {isLoggedIn && (
                     <PostModal 
                        onChange={onChange}
                        onSubmit={onSubmit} 
                        title={title}
                        text={text}
                        buttonLabel="Create Post"
                     />
               )}
               <PostContainer posts={posts}/>
            </>
         )}
			
      </Container>
   );
}

export default Home;
