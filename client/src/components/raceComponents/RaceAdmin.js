import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

const RaceAdmin = ({ race }) => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const { deleteRace, setCurrentRace, clearCurrentRace } = raceHandlerContext;

	// convert time from ISO to local

	const localDate = new Date(race.date).toLocaleDateString();
	const localTime = new Date(race.date).toLocaleTimeString().slice(0, 5);
	const localDateTime = `${localDate} ${localTime}`;

	const date = localDateTime;

	const {
		_id,
		name,
		capacity,
		entries,
		location,
		price,
		info1,
		info2,
		info3,
		show,
	} = race;

	const onDelete = () => {
		deleteRace(_id);
		clearCurrentRace();
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
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(show === 'yes' ? 'badge-success' : 'badge-danger')
					}
				>
					Show on frontpage: {show}
				</span>
			</h3>
			<ul>
				<li>Location: {location}</li>
				<li>Date and Time: {date}</li>
				<li>Entry fee: {price} kr</li>
				<li>{info1}</li>
				<li>{info2}</li>
				<li>{info3}</li>
			</ul>
			<button
				className='btn btn-primary btn-sm'
				onClick={() => setCurrentRace(race)}
			>
				Edit
			</button>
			<button className='btn btn-primary btn-sm' onClick={onDelete}>
				Delete
			</button>
		</div>
	);
};

RaceAdmin.propTypes = {
	race: Proptypes.object.isRequired,
};

export default RaceAdmin;
