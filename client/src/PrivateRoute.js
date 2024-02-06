import { useAuth } from './AuthContext'; // Import your AuthContext
import Unauthorized from './Unauthorized';
export default function PrivateRoute ({Component ,role}){
  const { isAuthenticated,userRole } = useAuth();
  return ((isAuthenticated===true && userRole===role) ? <Component/> : <Unauthorized/>);
};

