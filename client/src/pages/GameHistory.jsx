import TopNav from "../components/TopNav";
import LoginCheck from "../components/LoginCheck";
import { useLogin } from "../utils/LoginContext";
import { QUERY_GAMES } from '../utils/queries';
import { useQuery } from '@apollo/client';
import GameCard from '../components/GameCard';

export default function GameHistory(props){
  const {state, dispatch} = useLogin();
  const { loading, data:gameData } = useQuery(QUERY_GAMES);
  console.log(state);
  const handleClick = () => {};

  const games = gameData?.games || [];

  console.log({gameData});

  return (
    <>
      <LoginCheck />
      <TopNav />
      
      {state.loggedIn ? (
        <>
          {loading ? (
            <></>
          ) : (
            <>
              <h1>Game History</h1>
                {/* <GameCard numArray={[1,2,3]} choice={1} handleClick={handleClick} /> */}
                { games.map( game => (
                  <div className="row" key={game._id}>
                    <div className="col-12">
                      MainNum: {game.mainNumber} <br />
                      Win: {game.win ? "Yes you did!" : "No you didn't"}
                    </div>
                    <GameCard numArray={game.numberChoices} choice={game.choice} handleClick={handleClick} />
                  </div>
                ))}
            </>
          )}

        </>
      ) : (
        // <Navigate to="/login" />
        <>
          Please log in
        </>
      )}
    </>
  )
};