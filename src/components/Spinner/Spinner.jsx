import React from 'react';
import RingLoader from "react-spinners/RingLoader";
import './spinner.css'

const Spinner = () => {
   return (
     <div className="spinner">
        <RingLoader color={'#7ED321'} size={50} />
     </div>
   );
};

export default Spinner;