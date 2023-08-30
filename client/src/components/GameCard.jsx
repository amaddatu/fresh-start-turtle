export default function GameCard({numArray, handleClick, choice}){
  const chosen = choice ? choice : -1;
  return (
    <>
      {numArray.map( (num, index) => (
        <div className="col-12 col-md-4" key={"card" + index}>
          <div className={"card" + (chosen === num ? " chosen" : "")} >
            <a href="#" className="card-body" onClick={(event) => handleClick(event, num)}>
              <h5 className="card-title">{num}</h5>
            </a>
          </div>
        </div>
      ) )}
    </>
  )
}