import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Trends = () => {
   const [trendMovie, setTrendMovie] = useState([])
   const [time, setTime] = useState("day")
   const [active,setActive] = useState(false)
   useEffect(() => {
      axios(`https://api.themoviedb.org/3/trending/movie/${time}?&api_key=0507039a9e671aca598931b85b443a55&language=ru`)
        .then(({data}) => setTrendMovie(data.results))
   },[time])
   const formatDate = (date) => {
      const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
      const reversedDate = date.split('-').reverse()
      reversedDate[1] = month[reversedDate[1] - 1]
      return reversedDate.join(' ')
   }
   return (
     <div className="container">
        <div className="selector-wrap">
           <h1>В тренде</h1>
           <div className="selector">
              <button className={active?"selector-btn active":"selector-btn"} onClick={() => setActive(!active) || setTime('day')}>Сегодня</button>
              <button className={!active?"selector-btn active":"selector-btn"} onClick={() => setActive(!active) || setTime('week')}>На этой неделе</button>
           </div>
        </div>
        <div className="scroller">
           {
              trendMovie.map((item) => (
                <div className="movie-card" key={item.id}>
                   <div className="card-img">
                      <Link to={`/movie/${item.id}`}>
                         <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`} alt=""/>
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

export default Trends;