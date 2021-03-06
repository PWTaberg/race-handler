import React, { useReducer } from 'react';
import axios from 'axios';
import RaceHandlerContext from './raceHandlerContext';
import raceHandlerReducer from './raceHandlerReducer';
import {
	GET_FEATURED_RACE,
	SET_SELECTED_RACE,
	CLEAR_SELECTED_RACE,
	ADD_RACE,
	DELETE_RACE,
	SET_CURRENT_RACE,
	CLEAR_CURRENT_RACE,
	UPDATE_RACE,
	GET_RACES,
	RACE_ERROR,
	CLEAR_ERRORS,
	CONFIRM_RACE,
	CLEAR_CONFIRMATION,
} from '../typesLibrary';

const RaceHandlerState = (props) => {
	const initialState = {
		/* race on front page */
		featuredRace: [],
		availableRaces: [],
		/* selected race for registration */
		selectedRace: null,
		raceArchive: [],
		/* race that is currently in the edit form */
		currentRace: null,
		loading: true,
		error: null,
		raceIsConfirmed: false,
		availableRacesSet: false,
	};

	const [state, dispatch] = useReducer(raceHandlerReducer, initialState);

	const addRace = async (race) => {
		let config;
		if (localStorage.token) {
			config = {
				headers: {
					Authorization: `Bearer ${localStorage.token}`,
					'Content-Type': 'application/json',
				},
			};
			try {
				const res = await axios.post('/api/v1/race-list', race, config);
				dispatch({
					type: ADD_RACE,
					payload: res.data.newRace,
				});
			} catch (err) {
				dispatch({
					type: RACE_ERROR,
					payload: err.response.data.error,
				});
			}
		}
	};
	const deleteRace = async (_id) => {
		let config;
		if (localStorage.token) {
			config = {
				headers: {
					Authorization: `Bearer ${localStorage.token}`,
				},
			};

			try {
				await axios.delete(`/api/v1/race-list/${_id}`, config);
				dispatch({
					type: DELETE_RACE,
					payload: _id,
				});
			} catch (err) {
				dispatch({
					type: RACE_ERROR,
					payload: err.response.data.error,
				});
			}
		}
	};

	const setCurrentRace = (race) => {
		// Current race is the race being edited/modified
		// Modify format from ISO to local time
		const localDate = new Date(race.date).toLocaleDateString();
		const localTime = new Date(race.date).toLocaleTimeString().slice(0, 5);
		const localDateTime = `${localDate}T${localTime}`;

		race.date = localDateTime;

		dispatch({ type: SET_CURRENT_RACE, payload: race });
	};

	const clearCurrentRace = () => {
		dispatch({ type: CLEAR_CURRENT_RACE });
	};

	const updateRace = async (race) => {
		let config;
		if (localStorage.token) {
			config = {
				headers: {
					Authorization: `Bearer ${localStorage.token}`,
					'Content-Type': 'application/json',
				},
			};

			try {
				const res = await axios.put(
					`/api/v1/race-list/${race._id}`,
					race,
					config
				);
				dispatch({
					type: UPDATE_RACE,
					payload: res.data.updatedRace,
				});
			} catch (err) {
				dispatch({
					type: RACE_ERROR,
					payload: err.response.data.error,
				});
			}
		}
	};

	//Get Featured Races
	const getFeaturedRace = () => {
		dispatch({ type: GET_FEATURED_RACE });
	};

	//Set Selected Race - for registration to race
	const setSelectedRace = (race) => {
		dispatch({ type: SET_SELECTED_RACE, payload: race });
	};

	//Clear selected race - after cancel registration
	const clearSelectedRace = () => {
		dispatch({ type: CLEAR_SELECTED_RACE });
	};

	const getRaces = async (query = 'sort=date&page=1&limit=20') => {
		/* possible query:
			- sort='field' - ascendind / '-field'- descending
			- select
			- page
			- limit 

			exampel: select=name, date&sort=date,name&page=1&limit=3
		*/

		try {
			const res = await axios.get(`/api/v1/race-list?${query}`);

			dispatch({
				type: GET_RACES,
				payload: res.data.raceList,
			});
		} catch (err) {
			dispatch({ type: RACE_ERROR, payload: err.response.data.error });
		}
	};

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	// Set Race as confirmed - used when registration is success
	const setRaceConfirmed = () => dispatch({ type: CONFIRM_RACE });

	// Clear Confirmation
	const clearConfirmation = () => dispatch({ type: CLEAR_CONFIRMATION });

	// Handle payment
	const handlePayment = async (token, product, runner, raceId) => {
		const body = {
			token,
			product,
			runner,
			raceId,
		};

		let config;
		if (localStorage.token) {
			config = {
				headers: {
					Authorization: `Bearer ${localStorage.token}`,
					'Content-Type': 'application/json',
				},
			};

			try {
				await axios.post('/api/v1/race-list/payment', body, config);
			} catch (err) {
				dispatch({
					type: RACE_ERROR,
					payload: err.response.data.error,
				});
			}
		}
	};

	return (
		<RaceHandlerContext.Provider
			value={{
				featuredRace: state.featuredRace,
				availableRaces: state.availableRaces,
				selectedRace: state.selectedRace,
				raceArchive: state.raceArchive,
				currentRace: state.currentRace,
				loading: state.loading,
				error: state.error,
				raceIsConfirmed: state.raceIsConfirmed,
				availableRacesSet: state.availableRacesSet,
				getFeaturedRace,
				setSelectedRace,
				clearSelectedRace,
				addRace,
				deleteRace,
				setCurrentRace,
				clearCurrentRace,
				updateRace,
				getRaces,
				clearErrors,
				clearConfirmation,
				setRaceConfirmed,
				handlePayment,
			}}
		>
			{props.children}
		</RaceHandlerContext.Provider>
	);
};

export default RaceHandlerState;
