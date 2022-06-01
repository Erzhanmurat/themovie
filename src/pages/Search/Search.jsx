import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import Spinner from "../../components/Spinner";
import {IMAGES_BASE, SERVER_API} from "../../constants/Constants";
import NoVideo from '../../assets/images/no_video_available.png'


const Search = () => {
   const [search, setSearch] = useState({})
   const [searchLoader, setSearchLoader] = useState(true)
   const {id} = useParams()
   useEffect(() => {
      axios(`${SERVER_API}search/multi?&query=${id}&api_key=0507039a9e671aca598931b85b443a55&language=ru-RUS`)
        .then(({data}) => {
           setSearch(data)
           setSearchLoader(false)
        })
   },[id])
   if (searchLoader) {
      return <Spinner />
   }
   return (
     <div className="header-search">
        <div className="container">
           <div className="row">
              <div className="col-3">
                 <div className="search-content">
                    <div className="nav-search">
                       <h2 className="search-menu--title">Результаты поиска</h2>
                       <Link to="/movie/"><li className="selected">Фильмы <span>0</span></li></Link>
                       <Link to="/serial/"><li>Сериалы <span>0</span></li></Link>
                       <Link to="/person/"><li>Люди <span>0</span></li></Link>
                       <Link to="/collection"><li>Коллекции <span>0</span></li></Link>
                       <Link to="/company/"><li>Компании <span>0</span></li></Link>
                       <Link to="/keywords"><li>Ключевые слова <span>0</span></li></Link>
                       <Link to="/"><li>Телесети <span>0</span></li></Link>
                    </div>
                 </div>
              </div>
              <div className="col-9 mt-lg-4">
                 <div className="row">
                 {
                    search?.results?.length ? search?.results?.map(item => (
                      <div className="col-2" key={item.id}>
                      <Link to={`/movie/${item.id}`} key={item.id}>
                               <img style={{width:"100%"}}
                                    src={item.poster_path? `${IMAGES_BASE}/w500/${item.poster_path}`: NoVideo} alt=""/>
                         <div className="card-content">
                               <h5 className="card-title">{item.title}</h5>
                         </div>
                      </Link>
                    </div>
                    )): <h4>Таких фильмов нет....</h4>
                 }
                 </div>
              </div>
           </div>
        </div>
     </div>
   );
};

export default Search;
