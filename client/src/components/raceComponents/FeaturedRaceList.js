import React, { Fragment, useContext, useEffect } from 'react';
import FeaturedRace from './FeaturedRace';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

const FeaturedRaceList = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const {
		featuredRace,
		getFeaturedRace,
		availableRaces,
	} = raceHandlerContext;

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
