import React, { Fragment, useContext, useEffect } from 'react';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';
//import AvailableRaceForAdminItem from './AvailableRaceForAdminItem';
import RaceAdmin from './RaceAdmin';
import Spinner from '../layout/Spinner';

const RaceListAdmin = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const { availableRaces, getRaces, loading } = raceHandlerContext;

	useEffect(() => {
		getRaces();
		// eslint-disable-next-line
	}, []);

	if (availableRaces !== null && availableRaces.length === 0 && !loading) {
		return (
			<Fragment>
				<h2 className='text-primary tezt-center'>No races available</h2>
				;
			</Fragment>
		);
	}

	if (availableRaces !== null && !loading) {
		return (
			<Fragment>
				{availableRaces.map((race) => (
					<RaceAdmin key={race._id} race={race} />
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

export default RaceListAdmin;
