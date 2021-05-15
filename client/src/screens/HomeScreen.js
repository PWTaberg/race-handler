import React, { useContext, useEffect } from 'react';
//import FeaturedRace from '../raceHandler/FeaturedRace';
import FeaturedRaceList from '../components/raceComponents/FeaturedRaceList';

//import AuthContext from '../../context/auth/authContext';
import AuthContext from '../context/auth/authContext';
//import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';
import RaceHandlerContext from '../context/raceHandler/raceHandlerContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const raceHandlerContext = useContext(RaceHandlerContext);

	// When first time HomeScreen is displayed
	// Try to get user info from loggid in user - id token is available
	// Get races from db
	useEffect(() => {
		authContext.loadUser();
		raceHandlerContext.getRaces();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='grid-2'>
			<div>
				<FeaturedRaceList />
			</div>
		</div>
	);
};

export default Home;
