import React, { useState, useContext, useEffect } from 'react';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

const RaceBuildForm = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const {
		addRace,
		updateRace,
		clearCurrentRace,
		currentRace,
	} = raceHandlerContext;

	useEffect(() => {
		if (currentRace !== null) {
			setRace(currentRace);
		} else {
			setRace({
				name: '',
				distance: '',
				date: '',
				capacity: '',
				entries: '',
				location: '',
				info1: '',
				info2: '',
				info3: '',
				price: '',
				show: 'no',
			});
		}
	}, [raceHandlerContext, currentRace]);

	// Local Race Initial state values
	const [race, setRace] = useState({
		name: '',
		distance: '',
		date: '',
		capacity: '',
		entries: '',
		location: '',
		info1: '',
		info2: '',
		info3: '',
		price: '',
		show: 'no',
	});

	const {
		name,
		distance,
		capacity,
		entries,
		location,
		date,
		info1,
		info2,
		info3,
		price,
		show,
	} = race;

	const onChange = (e) => {
		setRace({ ...race, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (currentRace === null) {
			addRace(race);
		} else {
			race.date = new Date(race.date).toISOString();
			updateRace(race);
		}
		clearAll();

		// Reset to initial values
		setRace({
			name: '',
			distance: '',
			date: '',
			capacity: '',
			entries: '',
			location: '',
			info1: '',
			info2: '',
			info3: '',
			price: '',
			show: 'no',
		});
	};

	const clearAll = () => {
		clearCurrentRace();
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='form-group'>
				<h2 className='text-primary'>
					{currentRace ? 'Edit Race' : 'Add Race'}
				</h2>
				<input
					type='text'
					placeholder='Name'
					name='name'
					value={name}
					onChange={onChange}
				/>
				<input
					type='number'
					placeholder='Distance'
					name='distance'
					value={distance}
					onChange={onChange}
				/>{' '}
				<input
					type='datetime-local'
					placeholder='Date and Time'
					name='date'
					value={date}
					onChange={onChange}
				/>
				<input
					type='number'
					placeholder='Capacity'
					name='capacity'
					value={capacity}
					onChange={onChange}
				/>{' '}
				<input
					type='number'
					placeholder='Entries'
					name='entries'
					value={entries}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Location'
					name='location'
					value={location}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Välkomna till ...'
					name='info1'
					value={info1}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Var: ...'
					name='info2'
					value={info2}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='När: ...'
					name='info3'
					value={info3}
					onChange={onChange}
				/>
				<input
					type='number'
					placeholder='Price'
					name='price'
					value={price}
					onChange={onChange}
				/>
				<h5 style={{ color: 'white' }}>Show on frontpage</h5>
				<input
					type='radio'
					name='show'
					value='yes'
					checked={show === 'yes'}
					onChange={onChange}
				/>{' '}
				<span style={{ color: 'white' }}>Yes</span>{' '}
				<input
					type='radio'
					name='show'
					value='no'
					checked={show === 'no'}
					onChange={onChange}
				/>{' '}
				<span style={{ color: 'white' }}>No</span>
				<div>
					<input
						type='submit'
						value={currentRace ? 'Update Race' : 'Add Race'}
						className='btn btn-primary btn-block'
					/>
				</div>
			</div>
			{currentRace && (
				<div>
					{' '}
					<button
						className='btn btn-light btn-block'
						onClick={clearAll}
					>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default RaceBuildForm;
