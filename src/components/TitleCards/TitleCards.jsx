import React, {useRef, useEffect } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {

  const cardsRef=useRef();

const handlewheel= (event)=> {
  event.preventDefault;
// to prevent default behaviour of mouse wheel scrolling
// ie so whenever we will rotate the mouse-wheel on this cart, it will not scroll the webpage vertically.

// now we have to scroll the cart horizontally, so we will use scrollLeft property of the cart.
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect( () =>{
  cardsRef.current.addEventListener('wheel', handlewheel);
},[])
// arrow function will be excuted whenever the component will be loaded.

 
  return (
    <div className='title-cards'>

      <h2>{title? title : "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        
        {cards_data.map( (card, index) => {
          return <div className="card" key={index} >
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>

        })} 

        </div> 
    </div>
  )
}

export default TitleCards