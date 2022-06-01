import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {IMAGES_BASE, SERVER_API} from "../../constants/Constants";

const Popular = () => {
   const [popularMovie, setPopularMovie] = useState([])
   useEffect(() => {
      axios(`${SERVER_API}movie/popular?&api_key=${process.env.REACT_APP_APIKEY}&language=ru-RUS`)
        .then(({data}) => setPopularMovie(data.results))
   })
   const formatDate = (date) => {
      const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
      const reversedDate = date.split('-').reverse()
      reversedDate[1] = month[reversedDate[1] - 1]
      return reversedDate.join(' ')
   }
   return (
     <div className="container">
        <h1>Что популярно</h1>
        <div className="scroller">
           {
              popularMovie.map((item) => (
                <div className="movie-card" key={item.id}>
                   <div className="card-img">
                      <Link to={`/movie/${item.id}`}>
                         <img src={`${IMAGES_BASE}/w440_and_h660_face${item.poster_path}`} alt={item.title}/>
                      </Link>
                      <div className="rating">{item.vote_average}</div>
                   </div>
                   <div className="card-content">
                      <Link to={`/movie/${item.id}`}>
                         <h3 className="card-title">{item.title}</h3>
                      </Link>
                      <span className="card-year">{formatDate(item.release_date)}</span>
                   </div>
                </div>
              ))
           }
        </div>
     </div>
   );
};

export default Popular;