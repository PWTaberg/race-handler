import React, { Fragment, useContext, useEffect } from 'react';
import AvailableRace from './AvailableRace';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';
import Spinner from '../layout/Spinner';

const AvailableRaceList = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const { availableRaces, getRaces, loading } = raceHandlerContext;

	// Add a const for limit, when we add pagination

	// When first loaded
	// Get all races from db
	useEffect(() => {
		const query =
			'sort=-date&page=1&limit=20&raceStatus=open&simulated=false';
		getRaces(query);
		// eslint-disable-next-line
	}, []);

	// No races available:
	if (availableRaces !== null && availableRaces.length === 0 && !loading) {
		return (
			<Fragment>
				<h2 className='text-primary text-center'>
					No races currently available
				</h2>
			</Fragment>
		);
	}

	// Races avalible:
	if (availableRaces !== null && !loading) {
		return (
			<Fragment>
				{availableRaces.map((race) => (
					<AvailableRace key={race._id} race={race} />
				))}
			</Fragment>
		);
	}

	if (loading) {
		return (
			<Fragment>
				<Spinner />
			</Fragment>
		);
	}
};

export default AvailableRaceList;
