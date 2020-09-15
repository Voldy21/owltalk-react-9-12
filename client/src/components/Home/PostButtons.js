import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'

const PostButtons = ({id, likes}) => {
   const cookies = new Cookies()
   const [postLikes, setPostLikes] = useState(likes.length)

   const like = async () => {
         let token = cookies.get('token')
         axios({
            method: "put",
            headers: {
               "x-auth-token": token
            },
            url: `http://localhost:5000/api/posts/like/${id}`
         }).then(res=> setPostLikes(res.data.length))
           .catch(error => console.log(error.message))
   }
   // setPostLikes(res.data.likes.length)

   const dislike = async () => {
         let token = cookies.get('token')
         axios({
            method: "delete",
            headers: {
               "x-auth-token": token
            },
            url: `http://localhost:5000/api/posts/like/${id}`
         }).then(res => setPostLikes(res.data.length))
            .catch(error => console.log(error.message))
   }

   return (
      <div className="user-likes">
         <div>
            <button 
            onClick={like}
            className="button-style btn btn-info btn-sm" >
               <i className="fa fa-caret-square-o-up" aria-hidden="true"></i>
            </button>
            <span> {postLikes || 0} </span>
            <button 
               className="button-style btn btn-info btn-sm" 
               onClick={dislike}
            >
               <i className="fa fa-caret-square-o-down" aria-hidden="true"></i>
            </button>
         </div>
      </div>
   );
}

export default PostButtons;
