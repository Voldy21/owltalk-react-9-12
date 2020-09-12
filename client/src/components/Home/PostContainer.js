import React from 'react';
import PostBlock from './PostBlock'

const PostContainer = ({posts}) => {
   return (
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
   );
}

export default PostContainer;
