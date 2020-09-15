import React from 'react';
import { Row, Col} from 'reactstrap'

const Post = ({post}) => {
   let {text, title} = post

   return (
      <article className="block mb-3 p-3 shadow">
            <Row>
               <Col>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="d-flex justify-content-end user-post-share">

                     <a className="button-style btn btn-info btn-sm" href="post.html"><i className="fa fa-comment-o" ></i></a>
                     
                     <button className="button-style btn btn-info btn-sm"><i className="fa fa-caret-square-o-up" aria-hidden="true"></i></button>

                     <button className="button-style btn btn-info btn-sm"><i className="fa fa-caret-square-o-down" aria-hidden="true"></i></button>

                  </div>
               </Col>
            </Row>
         </article>
   );
}

export default Post;
