import {useState, useEffect} from 'react';
import InfoModal from './InfoModal';

export default function GameBoard (props) {
  const [numArray, setNumArray] = useState([]);
  const [mainNum, setMainNum] = useState(-1);
  const [info, setInfo] = useState({
    open: false,
    heading: "Wow!",
    message: ''
  });
  const closeModal = (event) => {
    setInfo({...info, open: false});
  }

  const handleClick = (event, num) => {
    event.preventDefault();

    if(num === mainNum){
      // alert("Win!");
      setInfo({...info, open: true, message: "You win!"});
    }
    else{
      // alert("Lose!");
      setInfo({...info, open: true, message: "You lose!"});
    }
  }

  useEffect( () => {
    let out = [...numArray];
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
  }, []);
  return (
    <section className="row">
      <div className="col-12">
        <h3>Find this num: {mainNum}</h3>
      </div>
      {numArray.map( (num, index) => (
        <div className="col-12 col-md-4" key={"card" + index}>
          <div className="card">
            <a href="#" className="card-body" onClick={(event) => handleClick(event, num)}>
              <h5 className="card-title">{num}</h5>
            </a>
          </div>
        </div>
      ) )}
      {info.open ? (
        <InfoModal closeFunction={closeModal} heading={info.heading} message={info.message} />
      ) : (
        <></>
      )}
    </section>
  )
}