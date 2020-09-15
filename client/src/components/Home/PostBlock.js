import React from 'react';
import PostButtons from './PostButtons'
import {Link} from 'react-router-dom'

const PostBlock = ({post, toggle}) => {
   return (
      
      
         <>
         {!toggle ? (
            <article className="block mb-3 shadow">
               <div className="row">
               
                  <div className="col-sm-3">
                     {/* Image */}
                     <Link to={`/profile/${post.user}`}><img 
                     className="img-fluid rounded-circle" 
                     style={{width: "150px"}} 
                     alt="profile" 
                     src={post.avatar}/>
                     </Link>
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
            ) : (
            <article className="block p-3 mb-3 shadow">
               <div className="row">
                  <div className="col" id="blockPosted1">
                     {/* Title */}
                     <h3>
                        {post.title}
                     </h3>
                     {/* Block */}
                     <p>
                        {post.text}
                     </p>
                     <div className="d-flex justify-content-end">
                        <PostButtons likes={post.likes} id={post._id}/>
                     </div>
                  </div>
               </div>
            </article>
            )}
         </>
         
      
   );
}

export default PostBlock;
