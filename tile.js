import React from 'react'
import grArrow from './greenArrow.svg'
import rdArrow from './redArrow.svg'
import './CardStockTile.css'


function CardStockTile (props){
  const { name, change, price } = props;
  

  function checkValue(num){
    let float = parseFloat(num)
    if(float > 0){
      return grArrow
    } else return rdArrow
  }
  let displayPrice;
  price && (
    displayPrice = price.toFixed(2)
  )

  return(
    <div className='stock-tile-container' style={{width: "100%", height: "25%", padding: "2%"}}>
      <div>
        <img src={checkValue(change)}/>
      </div>
      <div className='tile-info-container'>
        <h5>{name}</h5>
        <div className='tile-data-container'>
          <p>{`+${change.toFixed(2)}%`}</p>
          <p id='tile-price'>{displayPrice}</p>
        </div>
      </div>
     </div>
  )
}

export default CardStockTile;