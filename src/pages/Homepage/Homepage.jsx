import React from 'react';
import Welcome from "../../components/Welcome";
import Trends from "../../components/Trends";
import Popular from "../../components/Popular";
import Footer from "../../components/Footer";


const Homepage = () => {
   return (
     <div>
        <Welcome />
        <Popular />
        <Trends />
        <Footer />
     </div>
   );
};

export default Homepage;