import React from 'react';
//import AvailableRacesForAdmin from '../adminRaceHandler/AvailableRacesForAdmin';
//import RaceBuildForm from '../adminRaceHandler/RaceBuildForm';
import RaceListAdmin from '../components/raceComponents/RaceListAdmin';
import RaceBuildForm from '../components/raceComponents/RaceBuildForm';

const RaceListAdminScreen = () => {
	return (
		<div className='grid-2'>
			<div>
				<RaceBuildForm />
			</div>
			<div>
				<RaceListAdmin />
			</div>
		</div>
	);
};

export default RaceListAdminScreen;
