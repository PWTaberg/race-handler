import React from 'react';
import AvailableRacesForAdmin from '../adminRaceHandler/AvailableRacesForAdmin';
import RaceBuildForm from '../adminRaceHandler/RaceBuildForm';

const AdminRacePreperation = () => {
    return (
        <div className='grid-2'>
            <div>
                <RaceBuildForm />
            </div>
            <div>
                <AvailableRacesForAdmin />
            </div>
        </div>
    );
};

export default AdminRacePreperation;
