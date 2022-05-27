import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faLink} from "@fortawesome/free-solid-svg-icons";
import FastAverageColor from "fast-average-color";
import ReactPlayer from "react-player";


const MovieInfo = () => {
   const [film, setFilm] = useState({})
   const [credits, setCredits] = useState({})
   const [recommendations, setRecommendations] = useState([])
   const [media, setMedia] = useState({})
   const [color, setColor] = useState('')
   const {id} = useParams()
   const [filmLoader, setFilmLoader] = useState(true);
   const [creditLoader, setCreditLoader] = useState(true);
   const [recommendationsLoader, setRecommendationsLoader] = useState(true)
   const [mediaLoader, setMediaLoader] = useState(true)
   useEffect(() => {
      axios(`https://api.themoviedb.org/3/movie/${id}?&sort_by=popularity.desc&api_key=0507039a9e671aca598931b85b443a55&language=ru`)
        .then(({data}) => {
           setFilm(data)
           setFilmLoader(false)
        })
      axios(`https://api.themoviedb.org/3/movie/${id}/credits?&sort_by=popularity.desc&api_key=0507039a9e671aca598931b85b443a55&language=ru`)
        .then(({data}) => {
           setCredits(data.cast)
           setCreditLoader(false)
        })
      axios(`https://api.themoviedb.org/3/movie/${id}/recommendations?&sort_by=popularity.desc&api_key=0507039a9e671aca598931b85b443a55&language=ru`)
        .then(({data}) => {
           setRecommendations(data.results)
           setRecommendationsLoader(false)
        })
      axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=0507039a9e671aca598931b85b443a55&language=ru`)
        .then(({data}) => {
           setMedia(data.results)
           setMediaLoader(false)
        })
   },[id])
   if (filmLoader || creditLoader || creditLoader || recommendationsLoader || mediaLoader) {
      return <Spinner />
   }
   function onImageLoad(e) {
      new FastAverageColor().getColorAsync(e.target).then((imgColor) => {
         setColor(`rgba(${imgColor.value.slice(0, 3).join(',')},0.9)`)
      })
   }
   return (
     <>
        <div className="movie-header" style={{backgroundImage: `url(/t/p/w1920_and_h800_multi_faces/${film.backdrop_path})`}}>
           <div className="background" style={{background: color}}>
              <div className="container">
                 <div className="row">
                    <div className="col-3">
                       <div className="film-img">
                          <img src={`/t/p/w300_and_h450_face${film.poster_path}`}
                               onLoad={onImageLoad}
                               crossOrigin="anonymous"
                               alt=""/>
                       </div>
                    </div>
                    <div className="col-9">
                       <div className="movie-content">
                          <div>
                             <Link to={`/movie/${film.id}`}>
                                <h1 className="card-title">{film.title}</h1>
                             </Link>
                             <span>{`(${(film.release_date).split('-').reverse()})`}</span>
                          </div>
                          <div className="overview">
                             <h2>Обзор</h2>
                             <p>{film.overview}</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div className="container">
           <div className="row">
              <div className="col-9">
                 <div className="character">
                    <h2>В главных ролях</h2>
                    <div className="scroller">
                       {
                          credits.map((item) => (
                            <div className="character-card" key={item.id}>
                               <div className="character-img">
                                  <Link to={`/person/${item.id}`}>
                                     <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item.profile_path}`} alt=""/>
                                  </Link>
                               </div>
                               <div className="character-content">
                                  <h3 className="character-title">{item.name}</h3>
                                  <p className="character-name">{item.character}</p>
                               </div>
                            </div>
                          ))
                       }
                    </div>
                 </div>
                 <div className="media">
                    <h2>Трейлер</h2>
                    <div className="scroller">
                       <div className="row">
                          {
                             media.map(item => (
                               <div className="col-4">
                                  {
                                     <ReactPlayer width={400} key={item.id} url={`https://www.youtube.com/watch?v=${item.key}`}/>
                                  }
                               </div>
                             ))
                          }
                       </div>
                    </div>
                 </div>
                 <div className="actors">
                    <h2>Рекомендации</h2>
                    <div className="scroller">
                       {
                          recommendations.map((item) => (
                            <div className="recommendation-card" key={item.id}>
                               <div className="recommendation-img">
                                  <Link to={`/movie/${item.id}`}>
                                     <img src={`https://www.themoviedb.org/t/p/w500_and_h282_face${item.backdrop_path}`} alt=""/>
                                  </Link>
                               </div>
                               <div className="recommendation-content">
                                  <Link to={`/movie/${item.id}`}>
                                     <h3 className="card-title">{item.title}</h3>
                                  </Link>
                               </div>
                            </div>
                          ))
                       }
                    </div>
                 </div>
              </div>
              <div className="col-3">
                 <div className="movie-total">
                    <div className="social-icons">
                       <button>
                          <FontAwesomeIcon icon={faFacebookF} />
                       </button>
                       <button>
                          <FontAwesomeIcon icon={faTwitter} />
                       </button>
                       <button>
                          <FontAwesomeIcon icon={faInstagram} />
                       </button>
                       <button>
                          <FontAwesomeIcon icon={faLink} />
                       </button>
                    </div>
                    <h6>Исходное название <br/>{film.title}</h6>
                    <h6>Статус <br/>{film.status}</h6>
                    <h6>Исходный язык <br/>{film.original_language}</h6>
                    <h6>Бюджет <br/>{`$${film.budget}`}</h6>
                    <h6>Сборы <br/>{`$${film.revenue}`}</h6>
                 </div>
              </div>
           </div>
        </div>
     </>

   );
};

export default MovieInfo;