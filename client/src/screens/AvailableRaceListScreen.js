import React, { useContext } from 'react';
import AvailableRaceList from '../components/raceComponents/AvailableRaceList';
import ConfirmRace from '../components/raceComponents/ConfirmRace';
//import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';
import RaceHandlerContext from '../context/raceHandler/raceHandlerContext';

const AvailableRaceListScreen = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const { selectedRace } = raceHandlerContext;

	// No races aavailable
	if (selectedRace === null) {
		return (
			<div className='grid-2'>
				<div></div>
				<div>
					<AvailableRaceList />
				</div>
			</div>
		);
	}

	// Races are available
	return (
		<div className='grid-2'>
			<div>
				<ConfirmRace />
			</div>
			<div>
				<AvailableRaceList />
			</div>
		</div>
	);
};

export default AvailableRaceListScreen;
