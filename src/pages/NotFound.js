import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div>
    <p>Click to route to "/oops" which isn't a registered route:</p>
    <Link to="/login">Let's go to login</Link>
  </div>
);

export default NotFound;
