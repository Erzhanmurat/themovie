import React from 'react';
import {Link} from "react-router-dom";

const NavInfo = () => {
   return (
     <div className="nav-info">
        <div className="nav">
           <Link><span>Обзор</span></Link>
           <Link><span>Медиа</span></Link>
           <Link><span>Фандом</span></Link>
           <Link><span>Поделиться</span></Link>
        </div>
     </div>
   );
};

export default NavInfo;