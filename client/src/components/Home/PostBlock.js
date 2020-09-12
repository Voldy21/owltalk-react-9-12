import React from 'react';
import PostButtons from './PostButtons'
const PostBlock = ({post}) => {
   return (
      
      <article className="block mb-3 shadow">
         <div className="row">
            <div className="col-sm-3">
               {/* Image */}
               <img 
               className="img-fluid rounded-circle" 
               style={{width: "150px"}} 
               alt="profile" 
               src={post.avatar}/>
               <h3>{post.name}</h3>
            </div>
            
            <div className="col-sm-9" id="blockPosted1">
               {/* Title */}
               <h3>
                  {post.title}
               </h3>
               {/* Block */}
               <p>
                  {post.text}
               </p>
               <PostButtons likes={post.likes} id={post._id}/>
            </div>
         </div>
      </article>
   );
}

export default PostBlock;
