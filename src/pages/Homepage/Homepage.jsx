import React from 'react';
import Welcome from "../../components/Welcome";
import Trends from "../../components/Trends";
import Popular from "../../components/Popular";


const Homepage = () => {
   return (
     <div>
        <Welcome />
        <Popular />
        <Trends />
     </div>
   );
};

export default Homepage;