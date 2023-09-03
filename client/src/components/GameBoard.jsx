import {useState, useEffect} from 'react';
import InfoModal from './InfoModal';
import { useMutation } from '@apollo/client';
import { QUERY_GAMES } from '../utils/queries';
import { MUTATION_ADD_GAME } from '../utils/mutations';
import GameCard from './GameCard';

export default function GameBoard (props) {
  // adding a mutation to keep history
  // addGame is a function that we can use asynchronously
  const [seed, setSeed] = useState(1);
  const [addGame, {error:errorAddingGame}] = useMutation(MUTATION_ADD_GAME,{
    // updating cache allows you to fix bugs where you have to refresh certain pages via browser
    // after the cache is updated via the method below, the website seamlessly integrates the new data
    // without performing additional queries
    // the variable name - addGame - should also match what you put in your mutation
    update(cache, { data: { addGame } }) {
      try {
        const destructQuery = cache.readQuery({ query: QUERY_GAMES });
        if(destructQuery && destructQuery.hasOwnProperty("games")){
          // find the related query that you want to update, 
          // for adding a game (MUTATION_ADD_GAME)
          // I would want to update the query that gets all games (QUERY_GAMES)
          // this will read data from the games cache and save it a variable called games (the variable name - games - should also match what you have in the QUERY_GAMES)
          const { games } = destructQuery;

          // update the old query by inserting the new data
          cache.writeQuery({
            query: QUERY_GAMES,
            // i know how I want this sorted, I want all new data at the beginning, (addGame)
            // copy all old data to the end of the array (...games)
            // ... is called the spread operator (copy-and-paste operator)
            data: { games: [addGame, ...games] },
          });
        }

      } catch (e) {
        console.error(e);
      }
    },
  });
  const [numArray, setNumArray] = useState([]);
  const [mainNum, setMainNum] = useState(-1);
  const [info, setInfo] = useState({
    open: false,
    heading: "Wow!",
    message: ''
  });
  const closeModal = (event) => {
    setInfo({...info, open: false});

    // refresh the component by selecting new numbers in useEffect
    setSeed(seed + 1);
  }

  const handleClick = async (event, num) => {
    event.preventDefault();

    let win = num === mainNum;
    if(win){
      // alert("Win!");
      setInfo({...info, open: true, message: "You win!"});
    }
    else{
      // alert("Lose!");
      setInfo({...info, open: true, message: "You lose!"});
    }

    try{
      const { data } = await addGame({
        variables: {
          game: {
            mainNumber: mainNum,
            numberChoices: numArray,
            choice: num,
            win: win
          }
        }
      });

      console.log(data);

    }catch(err){
      console.log(errorAddingGame);
      console.log(err);
    }
  }

  useEffect( () => {
    // start the out array as empty
    let out = [];
    // 1-30 randomly chosen
    for(let i = 0; i < 3; i++){
      let chosen = Math.ceil(Math.random() * 30);
      while(numArray.filter(num => num === chosen).length > 0){
        // choose again
        chosen = Math.ceil(Math.random() * 30);
      }
      out = [...out, chosen];
    }
    setNumArray(out);
    setMainNum(out[Math.floor(Math.random() * out.length)]);
  }, [seed]);
  return (
    <section className="row">
      <div className="col-12">
        <h3>Find this num: {mainNum}</h3>
      </div>
      <GameCard numArray={numArray} handleClick={handleClick}/>
      {info.open ? (
        <InfoModal closeFunction={closeModal} heading={info.heading} message={info.message} />
      ) : (
        <></>
      )}
    </section>
  )
}