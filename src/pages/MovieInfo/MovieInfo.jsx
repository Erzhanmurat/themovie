import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Spinner from "../../components/Spinner";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faLink} from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faBookmark} from "@fortawesome/free-solid-svg-icons/faBookmark";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {IMAGES_BASE, SERVER_API} from "../../constants/Constants";

const API_KEY = process.env.REACT_APP_APIKEY
const MovieInfo = () => {
   const [film, setFilm] = useState({})
   const [credits, setCredits] = useState({})
   const [recommendations, setRecommendations] = useState([])
   const [media, setMedia] = useState({})
   const {id} = useParams()
   const [filmLoader, setFilmLoader] = useState(true);
   const [creditLoader, setCreditLoader] = useState(true);
   const [recommendationsLoader, setRecommendationsLoader] = useState(true)
   const [mediaLoader, setMediaLoader] = useState(true)
   useEffect(() => {
      axios(`${SERVER_API}movie/${id}?&sort_by=popularity.desc&api_key=${API_KEY}&language=ru`)
        .then(({data}) => {
           setFilm(data)
           setFilmLoader(false)
        })
      axios(`${SERVER_API}movie/${id}/credits?&sort_by=popularity.desc&api_key=${API_KEY}&language=ru`)
        .then(({data}) => {
           setCredits(data.cast)
           setCreditLoader(false)
        })
      axios(`${SERVER_API}movie/${id}/recommendations?&sort_by=popularity.desc&api_key=${API_KEY}&language=ru`)
        .then(({data}) => {
           setRecommendations(data.results)
           setRecommendationsLoader(false)
        })
      axios(`${SERVER_API}movie/${id}/videos?api_key=${API_KEY}&language=ru`)
        .then(({data}) => {
           setMedia(data.results)
           setMediaLoader(false)
        })
   },[id])
   if (filmLoader || creditLoader || creditLoader || recommendationsLoader || mediaLoader) {
      return <Spinner />
   }
   return (
     <>
        <div className="movie-header" style={{backgroundImage: `url(${IMAGES_BASE}/w1920_and_h800_multi_faces/${film.backdrop_path})`}}>
           <div className="background" style={{background: 'rgba(0, 0, 0, 0.8)'}}>
              <div className="container">
                 <div className="row">
                    <div className="col-3">
                       <div className="film-img">
                          <img src={`${IMAGES_BASE}/w300_and_h450_face${film.poster_path}`} alt=""/>
                       </div>
                    </div>
                    <div className="col-9">
                       <div className="movie-content">
                          <div>
                             <Link to={`/movie/${film.id}`}>
                                <h1>{film.title}</h1>
                             </Link>
                             <div className="genres">
                                <span>{`(${(film.release_date).split(' ').reverse()})`}</span>
                                {
                                   film.genres.map((item) => (
                                        <li  className="genres-list" key={item.id}>{item.name}</li>
                                   ))
                                }
                             </div>
                             <div className="custom-corner">
                                <div className="info-rating me-3">{film.vote_average}</div>
                                <h6 className="me-3">Пользовательский <br/>счёт</h6>
                                <div className="custom-btn me-3">
                                   <button>
                                      <FontAwesomeIcon icon={faList} />
                                   </button>
                                </div>
                                <div className="custom-btn me-3">
                                   <button>
                                      <FontAwesomeIcon icon={faHeart} />
                                   </button>
                                </div>
                                <div className="custom-btn me-3">
                                   <button>
                                      <FontAwesomeIcon icon={faBookmark} />
                                   </button>
                                </div>
                                <div className="custom-btn me-3">
                                   <button>
                                      <FontAwesomeIcon icon={faStar} />
                                   </button>
                                </div>
                             </div>
                          </div>
                          <div className="overview">
                             <h5>Обзор</h5>
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
                                     <img src={`${IMAGES_BASE}/w440_and_h660_face${item.profile_path}`} alt=""/>
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
                               <div className="col-4" key={item.id}>
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
                                     <img src={`${IMAGES_BASE}/w500_and_h282_face${item.backdrop_path}`} alt=""/>
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