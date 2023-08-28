import LoginForm from "../components/LoginForm";
import TopNav from "../components/TopNav";
import LoginCheck from "../components/LoginCheckHelper";

export default function Login(props){
  return (
    <>
      <LoginCheck />
      <TopNav />
      <h1>Login</h1>
      <LoginForm />
    </>
  )
}