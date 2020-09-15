import React, {useState} from 'react';
import { Button, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';

const PostModal = (props) => {
   const [isOpen, setIsOpen] = useState(false);


  const toggle = () => setIsOpen(!isOpen);
   const {buttonLabel, onSubmit, major, location, hobbies, name, onChange} = props;

   return (
      <div>
      <Button className="button-style" style={{width: "100%"}} onClick={toggle}>{buttonLabel}</Button>
      <Collapse isOpen={isOpen}>
        <Form onSubmit={onSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
               Name
            </Label>
            <Input 
               type="text"
               name="name" 
               id="name" 
               placeholder="Some cool location" 
               value={name}
               onChange={onChange}/>
         </FormGroup>
         <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
               Location
            </Label>
            <Input 
               type="text"
               name="location" 
               id="location" 
               placeholder="Some cool location" 
               value={location}
               onChange={onChange}/>
         </FormGroup>
         <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
               Major
            </Label>
            <Input 
               type="textarea" 
               name="major" 
               id="major" 
               placeholder="Something brilliant"
               value={major}
               onChange={onChange} />
         </FormGroup>
         <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
               Hobbies
            </Label>
            <Input 
               type="textarea" 
               name="hobbies" 
               id="hobbies" 
               placeholder="Something brilliant"
               value={hobbies}
               onChange={onChange} />
         </FormGroup>
            <Button color="primary">Edit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </Form>
      </Collapse>
    </div>
   );
}

export default PostModal;
