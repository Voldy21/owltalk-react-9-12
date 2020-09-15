import React, {useState} from 'react';
import { Button, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';

const PostModal = (props) => {
   const [isOpen, setIsOpen] = useState(false);


  const toggle = () => setIsOpen(!isOpen);
   const {buttonLabel, onSubmit, text, title, onChange} = props;

   return (
      <div>
      <Button className="mt-2 button-style" onClick={toggle}>{buttonLabel}</Button>
      <Collapse isOpen={isOpen}>
        <Form onSubmit={onSubmit}>
         <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
               Title
            </Label>
            <Input 
               type="text"
               name="title" 
               id="title" 
               placeholder="Some cool title" 
               value={title}
               onChange={onChange}/>
         </FormGroup>
         <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
               Post
            </Label>
            <Input 
               type="textarea" 
               name="text" 
               id="body" 
               placeholder="Something brilliant"
               value={text}
               onChange={onChange} />
         </FormGroup>
            <Button color="primary">Submit Post</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </Form>
      </Collapse>
    </div>
   );
}

export default PostModal;
