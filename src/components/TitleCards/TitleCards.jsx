import React, {useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {


  const [apiData, setApiData] = useState([]);
  const cardsRef=useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGFlYjhmMjRiZGFmOGNmZTk0NDU2ZGI5YjM0NDA2YiIsIm5iZiI6MTc1ODA4Mjc1Ny4wOTEsInN1YiI6IjY4Y2EzNmM1OTk2OTA2ZjM1NjY4MzMwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7yDRAWhRJr_ryNWLc6cIDvgCxsxLdw_Sxz6kfbTU-gs'
  }
};






const handlewheel= (event)=> {
  event.preventDefault;
// to prevent default behaviour of mouse wheel scrolling
// ie so whenever we will rotate the mouse-wheel on this cart, it will not scroll the webpage vertically.

// now we have to scroll the cart horizontally, so we will use scrollLeft property of the cart.
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect( () =>{


  fetch(`https://api.themoviedb.org/3/movie/${category? category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json()) // we are getting this data from fetch request and we will get response, so using this response, we will store data into our state variable.
  .then(res => setApiData(res.results)) // now we are getting results from the response and storing it in our state variable using setApiData function.
  .catch(err => console.error(err)); // now using this data we will display movie information on our cards.

// now we will execute this fetch function inside useEffect so that it will be executed whenever the component will be loaded.
// and we will store the fetched data inside a state variable using useState hook.


  cardsRef.current.addEventListener('wheel', handlewheel);
},[])
// arrow function will be excuted whenever the component will be loaded.

 
  return (
    <div className='title-cards'>

      <h2>{title? title : "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        
        {/* You'll notice that movie, TV and person objects contain references to different file paths. 
        In order to generate a fully working image URL, you'll need 3 pieces of data. 
        Those pieces are a base_url, a file_size and a file_path.

The first two pieces can be retrieved by calling the /configuration API and the third is the file path
 you're wishing to grab on a particular media object. Here's what a full image URL looks like if the 
 poster_path of /1E5baAaEse26fej7uHcjOgEE2t2.jpg was returned for a movie, and you were looking for the w500 size:
Example
https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg */}


        {apiData.map( (card, index) => {
          return <div className="card" key={index} >
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>

        })} 

        </div> 
    </div>
  )
}

export default TitleCards