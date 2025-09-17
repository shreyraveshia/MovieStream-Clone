import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'

const Player = () => {

  const {id} = useParams(); // we are using useParams hook to get the id of the movie which we have passed in the url.
  const navigate= useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  });

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGFlYjhmMjRiZGFmOGNmZTk0NDU2ZGI5YjM0NDA2YiIsIm5iZiI6MTc1ODA4Mjc1Ny4wOTEsInN1YiI6IjY4Y2EzNmM1OTk2OTA2ZjM1NjY4MzMwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7yDRAWhRJr_ryNWLc6cIDvgCxsxLdw_Sxz6kfbTU-gs'
  }
};

useEffect(() => {fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json()) // we are getting this data from fetch request and we will get response, so using this response, we will store data into our state variable.
  .then(res => setApiData(res.results[0]))// ie now we have to store this response data in our state variable using useState hook.
  .catch(err => console.error(err));
},[])


  return (
    <div className='player'>

        <img src={back_arrow_icon} alt="" onClick={ () =>{navigate(-2)} } />

        <iframe width="90%" height="90%" 
        src={`https://www.youtube.com/embed/${apiData.key}`}
         title='trailer' frameBorder='0' allowFullScreen ></iframe>  
         {/* // so we have added i frame to embed the youtube video */}

         <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
         </div>
    </div>
  )
}

export default Player