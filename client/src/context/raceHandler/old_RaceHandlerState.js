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
	CONFRIM_RACE,
	CLEAR_CONFIRMATION,
} from '../typesLibrary';

const RaceHandlerState = (props) => {
	const initialState = {
		featuredRace: [],
		availableRaces: [],
		selectedRace: null,
		raceArchive: [],
		currentRace: null,
		loading: true,
		error: null,
		raceIsConfirmed: false,
	};

	const [state, dispatch] = useReducer(raceHandlerReducer, initialState);

	const addRace = async (race) => {
		const config = {
			headers: {
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
			dispatch({ type: RACE_ERROR, payload: err.response.data.error });
		}
	};

	const deleteRace = async (_id) => {
		try {
			await axios.delete(`/api/v1/race-list/${_id}`);
			dispatch({
				type: DELETE_RACE,
				payload: _id,
			});
		} catch (err) {
			dispatch({ type: RACE_ERROR, payload: err.response.data.error });
		}
	};

	const setCurrentRace = (race) => {
		dispatch({ type: SET_CURRENT_RACE, payload: race });
	};

	const clearCurrentRace = () => {
		dispatch({ type: CLEAR_CURRENT_RACE });
	};

	const updateRace = async (race) => {
		const config = {
			headers: {
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
			dispatch({ type: RACE_ERROR, payload: err.response.data.error });
		}
	};

	//Get Featured Races
	const getFeaturedRace = () => {
		dispatch({ type: GET_FEATURED_RACE });
	};

	//Set Featured Races
	const setSelectedRace = (race) => {
		dispatch({ type: SET_SELECTED_RACE, payload: race });
	};

	//Get Featured Races
	const clearSelectedRace = () => {
		dispatch({ type: CLEAR_SELECTED_RACE });
	};

	const getRaces = async () => {
		try {
			const res = await axios.get('/api/v1/race-list');

			dispatch({
				type: GET_RACES,
				payload: res.data.raceList,
			});
		} catch (err) {
			dispatch({ type: RACE_ERROR, paylod: err.response.data.eror });
		}
	};

	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	const setRaceConfirmed = () => dispatch({ type: CONFRIM_RACE });

	const clearConfirmation = () => dispatch({ type: CLEAR_CONFIRMATION });

	const handlePayment = async (token, product, runner, raceId) => {
		const body = {
			token,
			product,
			runner,
			raceId,
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			await axios.post('/api/v1/race-list/payment', body, config);
		} catch (err) {
			dispatch({ type: RACE_ERROR, payload: err.response.data.error });
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
