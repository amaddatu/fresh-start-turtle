import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useLogin } from '../utils/LoginContext';
import { QUERY_ME } from '../utils/queries';
import { LOGIN, LOGOUT } from '../utils/actions';
import Auth from '../utils/auth';
export default function LoginCheck(props) {
  const {state, dispatch} = useLogin();

  const { loading, data:loginData } = useQuery(QUERY_ME);
  // console.log({loading, loginData});
  
  const token = state.token.length > 0 ? state.token : (Auth.getToken() || '');
  console.log("-----state-----");
  console.log(state);
  console.log("-----getToken-----");
  console.log(Auth.getToken());
  console.log("-----token-----");
  console.log(token);
  const loggedIn = token.length > 0;

  const user = loginData?.me;
  console.log({loginData});

  useEffect(() => {
    if(!loading){
      console.log(state);
      if(loggedIn && dispatch){  
        // same as localStorage.setItem('user_token', props.token);
        Auth.setToken(token);
        // add missing data based on token loaded from localstorage
        dispatch({type: LOGIN, payload: {
          token: token,
          user: user
        }});
      }
      else if(dispatch){
        // removes invalid token
        // same as localStorage.removeItem('user_token');
        Auth.deleteToken();
        // logout
        dispatch({type: LOGOUT});
      }
    }
  }, [loading]);


  return (<></>); // this component is simply used to initialize login and organize code
}