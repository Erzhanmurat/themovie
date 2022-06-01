import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {IMAGES_BASE} from "../../constants/Constants";


const Welcome = () => {
   let navigate = useNavigate()
   const [search, setSearch] = useState("")
   const handleInput = (e) => setSearch((e.target.value))
   const handleChange = (e) => {
      if (e.key === 'Enter') {
         navigate(`/browse/${search}`)
      }
   }
   const handleSearch = () => {
      navigate(`/browse/${search}`)
      setSearch("")

   }
   return (
     <div style= {{
        backgroundImage: `linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%),url("${IMAGES_BASE}/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/9ZyAUZrfccsjtDwYgc7yvOBnqM9.jpg")`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
     }} className="container welcome-content">
      <div className="container-lg welcome-title">
         <h1>Добро пожаловать.</h1>
         <h3>Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
      </div>
        <div className="container-lg welcome-search">
           <input onKeyPress={handleChange} onChange={handleInput} type="text" className="search-input" placeholder="Найти фильм, сериал, персону......"/>
           <button onClick={handleSearch} disabled={!search.trim()} className="search-btn">Search</button>
        </div>
     </div>
   );
};

export default Welcome;