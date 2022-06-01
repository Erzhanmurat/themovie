import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {IMAGES_BASE, SERVER_API} from "../../constants/Constants";
import '../../../src/assets/images/no-image.jpeg'

const API_KEY = process.env.REACT_APP_APIKEY
const PersonInfo = () => {
   const [person, setPerson] = useState({})
   const [movieCredits, setMovieCredits] = useState([])
   const {id} = useParams()
   useEffect(() => {
      axios(`${SERVER_API}person/${id}?&api_key=${API_KEY}&language=ru`)
        .then(({data}) => setPerson(data))
      axios(`${SERVER_API}person/${id}/movie_credits?&api_key=${API_KEY}&language=ru`)
        .then(({data}) => setMovieCredits(data.cast))
   })
   return (
        <div className="container">
           <div className="row mt-4">
             <div className="col-3">
                <div className="person-img">
                   <img src={`${IMAGES_BASE}/w600_and_h900_bestv2/${person.profile_path}`} alt=""/>
                </div>
                <div className="social-icons">
                   <button>
                      <FontAwesomeIcon icon={faTwitter} />
                   </button>
                   <button>
                      <FontAwesomeIcon icon={faInstagram} />
                   </button>
                </div>
                <h5>Персональная информация</h5>
                <h6>Дата рождения <br/> {person.birthday}</h6>
                <h6>Место рождения <br/> {person.place_of_birth}</h6>
                <h6>Также известность как <br/> {person.also_known_as}</h6>
             </div >
              <div className="col-9">
                 <div className="person-content">
                    <Link to={`/person${id}`}>
                       <h2>{person.name}</h2>
                    </Link>
                       <h6 className="fw-bold">Биография</h6>
                       <p>{person.biography}</p>

                 </div>
                 <h4>Известность за</h4>
                 <div className="scroller">
                    {
                       movieCredits.map((item) => (
                         <Link key={item.id} to={`/movie/${item.id}`}>
                            <div className="movie-card">
                               <div className="card-img">
                                  <img src={`${IMAGES_BASE}/w440_and_h660_face${item.poster_path}`} alt=""/>
                               </div>
                               <h5 className="card-title">{item.title}</h5>
                            </div>
                         </Link>
                       ))
                    }
                 </div>
              </div>
           </div>
        </div>
   );
};

export default PersonInfo;