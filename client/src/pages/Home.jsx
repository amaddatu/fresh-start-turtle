import { useQuery } from "@apollo/client";
import { useLogin } from "../utils/LoginContext";
import LoginCheck from "../components/LoginCheck";
import TopNav from "../components/TopNav";

export default function Home(props){
  const [state, dispatch] = useLogin();

  const userData = state.user || {message: "not logged in"};

  return (
    <>
      <LoginCheck />
      <TopNav />
      <h1>Home</h1>
      { state.loggedIn ? (
        <h2>{state.user.name}, you look good!</h2>
      ) : (
        <h2>Please log in, I missed you!</h2>
      )}
      {/* JSON.stringify(data, null, 2) --> the number 2 here signifies the number of indents with spaces */}
      {/* pre tag allows us to see the text with all line breaks and spacing */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </>
  )
}