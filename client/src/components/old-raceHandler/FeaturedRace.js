import React, { Fragment, useContext, useEffect } from 'react';
import FeaturedRaceItem from './FeaturedRaceItem';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

const FeaturedRace = () => {
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
				<FeaturedRaceItem key={race._id} race={race} />
			))}
		</Fragment>
	);
};

export default FeaturedRace;
