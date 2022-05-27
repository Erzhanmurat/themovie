import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

const PersonInfo = () => {
   const [person, setPerson] = useState({})
   const {id} = useParams()
   useEffect(() => {
      axios(`https://api.themoviedb.org/3/person/${id}?&sort_by=popularity.desc&api_key=0507039a9e671aca598931b85b443a55&language=ru`)
        .then(({data}) => setPerson(data))
   })
   return (
        <div className="container">
           <div className="row">
             <div className="col-3">
                <div className="person-img">
                   <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${person.profile_path}`} alt=""/>
                </div>
             </div >
              <div className="col-9">
                 <div className="person-content">
                    <Link to={`/person${id}`}>
                       {person.name}
                    </Link>
                 </div>
              </div>
           </div>
        </div>
   );
};

export default PersonInfo;