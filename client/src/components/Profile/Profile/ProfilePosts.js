import React from 'react';
import {Col} from 'reactstrap'
import PostBlock from '../../Home/PostBlock'

const ProfilePosts = ({posts, name}) => {

   return (
      <Col md="7" className="p-0">
         <h3 className="head text-center mt-2">{name}'s Posts</h3>
         <div className="dropdown-divider"></div>
         {posts !== null && posts.map(post => {
            return (
               <PostBlock
                  toggle={true}
                  post={post}
                  key={post._id}
               />
            )
         })}
		</Col>
   );
}

export default ProfilePosts;
