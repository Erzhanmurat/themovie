import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import Spinner from "../../components/Spinner";


const Search = () => {
   const [search, setSearch] = useState({})
   const [searchLoader, setSearchLoader] = useState(true)
   const {name} = useParams()
   useEffect(() => {
      axios(`https://api.themoviedb.org/3/search/movie/?&query=${name}?api_key=0507039a9e671aca598931b85b443a55&language=ru-RUS`)
        .then(({data}) => {
           setSearch(data.results)
           setSearchLoader(false)
        })
   },[name])
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
                       <Link to="/"><li className="selected">Фильмы <span>0</span></li></Link>
                       <Link to="/"><li>Сериалы <span>0</span></li></Link>
                       <Link to="/"><li>Люди <span>0</span></li></Link>
                       <Link to="/"><li>Коллекции <span>0</span></li></Link>
                       <Link to="/"><li>Компании <span>0</span></li></Link>
                       <Link to="/"><li>Ключевые слова <span>0</span></li></Link>
                       <Link to="/"><li>Телесети <span>0</span></li></Link>
                    </div>
                 </div>
              </div>
              <div className="col-9">
                 {
                    search.map(item => (
                      <Link to={`/movie/${item.id}`} key={item.id} className="item-col">
                         <div>
                            <img style={{width:"100%"}}
                                 src={`/t/p/w500/${item.poster_path}`} alt=""/>
                         </div>
                         <div className="card-content">
                            <Link to={`/movie/${item.id}`}>
                               <h5 className="card-title">{item.title}</h5>

                            </Link>
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

export default Search;