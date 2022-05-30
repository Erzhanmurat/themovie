import React from 'react';
import './NotPage.css'
import {Link} from "react-router-dom";

const NotPage = () => {
   return (
     <div className="not-page">
        <div className="text-wrapper">
           <div className="title" data-content="404">
              404
           </div>
           <br/>

              <div className="subtitle">
                 Oops, the page you're looking for doesn't exist.
              </div>
              <br/>
                 <br/>
                    <div className="buttons">
                       <Link to="/" className="button">Go to homepage</Link>
                    </div>
        </div>
     </div>
   );
};

export default NotPage;