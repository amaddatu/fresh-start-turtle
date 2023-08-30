import TopNav from "../components/TopNav";
import LoginCheck from "../components/LoginCheck";
import { useLogin } from "../utils/LoginContext";
import GameBoard from "../components/GameBoard";
import { Navigate } from 'react-router-dom';
export default function Game(props){
  // state is shared data
  const {state, dispatch} = useLogin();
  console.log(state);

  return (
    <>
      <LoginCheck />
      <TopNav />
      {state.loggedIn ? (
        <>
          <h1>Game</h1>
          <GameBoard />
        </>
      ) : (
        // <Navigate to="/login" />
        <>
          Please log in
        </>
      )}

    </>
  )
}