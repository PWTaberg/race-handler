import React, { useContext } from 'react';
import AvailableRaces from '../raceHandler/AvailableRaces';
import ConfirmRace from '../raceHandler/ConfirmRace';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

const Races = () => {
    const raceHandlerContext = useContext(RaceHandlerContext);
    const { selectedRace } = raceHandlerContext;

    if (selectedRace === null) {
        return (
            <div className='grid-2'>
                <div></div>
                <div>
                    <AvailableRaces />
                </div>
            </div>
        );
    }
    return (
        <div className='grid-2'>
            <div>
                <ConfirmRace />
            </div>
            <div>
                <AvailableRaces />
            </div>
        </div>
    );
};

export default Races;
