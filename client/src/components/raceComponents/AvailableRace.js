import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

const AvailableRace = ({ race }) => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const { setSelectedRace } = raceHandlerContext;

	// convert time from ISO to local
	// datetime is stored as ISO in db
	const localDate = new Date(race.date).toLocaleDateString();
	const localTime = new Date(race.date).toLocaleTimeString().slice(0, 5);
	const localDateTime = `${localDate} ${localTime}`;

	const date = localDateTime;

	const { name, price, capacity, entries, location } = race;

	const onClick = () => {
		setSelectedRace(race);
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(capacity - entries > 30
							? 'badge-success'
							: 'badge-danger')
					}
				>
					Entries: {entries} {'/'} {capacity}
				</span>
			</h3>
			<ul>
				<li>Location: {location}</li>
				<li>Date: {date}</li>
				<li>Entry fee: {price} kr</li>
			</ul>
			<button className='btn btn-primary btn-sm' onClick={onClick}>
				Select Race
			</button>
		</div>
	);
};

AvailableRace.propTypes = {
	race: Proptypes.object.isRequired,
};

export default AvailableRace;
