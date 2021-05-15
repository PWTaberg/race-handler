import React, { Fragment, useContext, useEffect } from 'react';
import FeaturedRace from './FeaturedRace';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

// It is possible to have more than one featured race, even if we have no plans for it
// It is decided by Race Admin
const FeaturedRaceList = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const { featuredRace, getFeaturedRace, availableRaces } =
		raceHandlerContext;

	// Get featured race - if it changes
	useEffect(() => {
		getFeaturedRace();
		// eslint-disable-next-line
	}, [availableRaces]);

	return (
		<Fragment>
			{featuredRace.map((race) => (
				<FeaturedRace key={race._id} race={race} />
			))}
		</Fragment>
	);
};

export default FeaturedRaceList;
