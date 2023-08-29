import { useState } from "react";
import { MUTATION_LOGIN } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../utils/LoginContext";
import { LOGIN } from "../utils/actions";
import Auth from "../utils/auth";

export default function LoginForm (props) {
  const navigate = useNavigate();
  const [formState, setFormState ] = useState({
    email: '',
    password: ''
  });

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: ''
  });

  const [login, { error }] = useMutation(MUTATION_LOGIN);

  const {state, dispatch} = useLogin();

  const handleChange = (event) => {
    event.preventDefault();

    const name = event.target.name;
    const value = event.target.value;

    setFormState({
      ...formState, // copy the old form state
      [name]: value // update the new value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    setShowError(false);
    setShowSuccess(false);

    try{
      const { data } = await login({
        variables: {
          ...formState
        }
      });

      console.log(data);
      const token = data?.login.token || '';
      const user = data?.login.user || {};
      console.log(data?.login.token)
      console.log(data?.login.user);
      setShowSuccess(true);
      setUserData(user);

      // save token
      Auth.setToken(token);
      // update state
      dispatch({type: LOGIN, payload: {
        token: token,
        user: user
      }});
      return navigate("/");
    }catch(err){
      console.error(err);
      setShowError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="email" 
        type="email" 
        placeholder="email@dot.com" 
        value={formState.email}
        onChange={handleChange}
      />
      <input 
        name="password" 
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      { showError ? (
        <h4 style={{color: "red"}}>
          Wrong password!
        </h4>
      ) : (
        <></>
      )}
      { showSuccess ? (
        <h4 style={{color: "green"}}>
          Good Login! Hello, {userData.name}!
        </h4>
      ) : (
        <></>
      )}
    </form>
  )
}