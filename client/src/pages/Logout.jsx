import Auth from '../utils/auth';
import { useEffect } from 'react';
import { useLogin } from '../utils/LoginContext';
import { LOGOUT } from '../utils/actions';
import { useNavigate } from 'react-router-dom';
export default function Logout(){
  const [state, dispatch] = useLogin();
  const navigate = useNavigate();
  useEffect( () => {
    // deletes the token in storage
    Auth.deleteToken();
    // updates the state for the application
    dispatch({
      type: LOGOUT
    });
    // go back to the homepage
    navigate("/");
  }, []);
  return (
    <>
      Logout
    </>
  );
}