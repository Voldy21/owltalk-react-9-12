import React from 'react';
import ProfileInfo from './Profile/ProfileInfo'
import ProfilePosts from './Profile/ProfilePosts'
import { Container, Row} from 'reactstrap';

const Profile = () => {
   return (
      <Container>
			<Row>
				<ProfileInfo/>
				<ProfilePosts/>
			</Row>
		</Container>
   );
}

export default Profile;
