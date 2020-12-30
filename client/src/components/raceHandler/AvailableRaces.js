import React, { Fragment, useContext, useEffect } from 'react';
import AvailableRaceItem from './AvailableRaceItem';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';
import Spinner from '../layout/Spinner';

const AvailableRaces = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const { availableRaces, getRaces, loading } = raceHandlerContext;

	useEffect(() => {
		getRaces();
		// eslint-disable-next-line
	}, []);

	if (availableRaces !== null && availableRaces.length === 0 && !loading) {
		return (
			<Fragment>
				<h2 className='text-primary text-center'>
					No races currently available
				</h2>
			</Fragment>
		);
	}

	if (availableRaces !== null && !loading) {
		return (
			<Fragment>
				{availableRaces.map((race) => (
					<AvailableRaceItem key={race._id} race={race} />
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

export default AvailableRaces;
