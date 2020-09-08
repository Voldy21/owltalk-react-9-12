import React, { useState, useEffect, useContext } from 'react';
import PostBlock from './sub-components/Post/PostBlock'
import axios from 'axios';
import {OwltalkContext} from '../context/owltalkContext'
import Cookies from 'universal-cookie'



const Home = () => {
   const owltalkContext = useContext(OwltalkContext)
   const {isLoggedIn} = owltalkContext
   const [posts, setPosts] = useState([])
   const [toggle, setToggle] = useState(false)
   const [title, setTitle] = useState("")
   const [text, setText] = useState("")
   const [update, setUpdate] = useState(false)
   
   useEffect(() => {
         axios.get("api/posts")
            .then(res => setPosts(res.data))
   }, [update])

   const onSubmit = async (e) => {
      e.preventDefault()
      const cookies = new Cookies()
      let token = cookies.get('token')
      await axios({
         method: "post",
         url: "api/posts",
         data: {
            title,
            text
         },
         headers: {
            "x-auth-token": token
         }
      })
      setText("")
      setTitle("")
      setToggle(false)
      setUpdate(!update)
   }

   return (
      
      // <!-- Main Block Section -->
		<div className="container text-center">
         {
         posts === null ? (<p>Loading</p>) : 
         posts.length === 0 ? (<p>No Posts</p>) :
         (
            <>
               {/* <!-- Create a new block button with modal --> */}
               {isLoggedIn && (
                  <button type="button" 
                  className="button-style btn btn-info btn-sm"
                  onClick={() => setToggle(!toggle)}>
                  Create Post
               </button>
               )}

               {toggle && (
                  <form onSubmit={onSubmit}>
                     <input 
                     value={title}
                     onChange={e => setTitle(e.currentTarget.value)}
                     placeholder="Title"
                     required/>
                     <br/>
                     <textarea 
                     value={text}
                     onChange={e => setText(e.currentTarget.value)}
                     placeholder="Text"
                     required/>
                     <br/>
                     <button>Submit</button>
                  </form>
               )}
               
            
               <section className="block-posts text-center mt-4">
                  <br/>
                  <div className="container">
                     <div className="row">
                        <div className="col-md-12">
                           {posts.map(post => (
                              <PostBlock 
                              id={post._id}
                              key={post._id} 
                              post={post}/>
                           ))}
                        </div>
                     </div>
                  </div>
               </section>
            </>
         )}
			
      </div>
   );
}

export default Home;
