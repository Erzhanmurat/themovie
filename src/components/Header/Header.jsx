import React from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell, faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/images/logo.png'

const Header = () => {
   return (
     <div className="header-container">
        <div className="container ">
           <div className="row">
              <div className="col-6">
                 <div className="item container-lg">
                    <div className="logo-img">
                       <Link to="/"><img src={Logo} alt="logo"/></Link>
                    </div>
                    <div className="navbar">
                       <Link to="/"><li>Фильмы</li></Link>
                       <Link to="/"><li>Сериалы</li></Link>
                       <Link to="/"><li>Люди</li></Link>
                       <Link to="/"><li>Ещё</li></Link>
                    </div>
                 </div>
              </div>
              <div className="col-6">
               <div className="container-lg item justify-content-end">
                  <button className="btn btn-light ms-5 border-0"><FontAwesomeIcon icon={faPlus}/></button>
                  <button className="btn btn-light ms-5 btn-sm ">RU</button>
                  <button className="btn btn-light ms-5 border-0"><FontAwesomeIcon icon={faBell}/></button>
                  <button className="btn btn-light ms-5 border-0"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
               </div>
              </div>
           </div>
        </div>
     </div>
   );
};

export default Header;