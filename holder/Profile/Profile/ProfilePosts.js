import React from 'react';
import { Row, Col} from 'reactstrap'

const ProfilePosts = ({id}) => {
   return (
      <Col md="7" className="p-0">
         <h3 className="head text-center mt-2">User Posts</h3>
         <div className="dropdown-divider"></div>
         <article className="block mb-3 shadow">
            <Row>
               <Col md="3">
                  <img className="img-fluid rounded-circle" 
                  style={{width: "150px"}} alt="" src="assets/1.jpg"/>
               </Col>
               <Col md="9">
                  <h3> My Block Post Title</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                  </p>
                  <div className="user-post-share">

                     <a className="button-style btn btn-info btn-sm" href="post.html"><i className="fa fa-comment-o" ></i></a>

                     <button className="button-style btn btn-info btn-sm"><i className="fa fa-share-square-o" aria-hidden="true"></i></button>

                     <button className="button-style btn btn-info btn-sm"><i className="fa fa-bookmark-o" aria-hidden="true"></i></button>

                  </div>
                  <div className="user-likes">
                     
                     <button className="button-style btn btn-info btn-sm"><i className="fa fa-caret-square-o-up" aria-hidden="true"></i></button>

                     <button className="button-style btn btn-info btn-sm"><i className="fa fa-caret-square-o-down" aria-hidden="true"></i></button>

                  </div>
               </Col>
            </Row>
         </article>
		</Col>
   );
}

export default ProfilePosts;
