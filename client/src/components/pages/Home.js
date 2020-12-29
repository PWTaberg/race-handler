import React, { useContext, useEffect } from 'react';
import FeaturedRace from '../raceHandler/FeaturedRace';
import AuthContext from '../../context/auth/authContext';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const raceHandlerContext = useContext(RaceHandlerContext);

    useEffect(() => {
        authContext.loadUser();
        raceHandlerContext.getRaces();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <FeaturedRace />
            </div>
        </div>
    )
}

export default Home;
