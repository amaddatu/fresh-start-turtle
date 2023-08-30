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
    update(cache, { data: { addGame } }) {
      try {
        const { games } = cache.readQuery({ query: QUERY_GAMES });

        cache.writeQuery({
          query: QUERY_GAMES,
          data: { games: [addGame, ...games] },
        });

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