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

export default (state, action) => {
	switch (action.type) {
		case ADD_RACE:
			return {
				...state,
				availableRaces: [...state.availableRaces, action.payload],
				loading: false,
			};
		case DELETE_RACE:
			return {
				...state,
				availableRaces: state.availableRaces.filter(
					(race) => race._id !== action.payload
				),
				loading: false,
			};
		case UPDATE_RACE:
			return {
				...state,
				availableRaces: state.availableRaces.map((race) =>
					race._id === action.payload._id ? action.payload : race
				),
				loading: false,
			};
		case SET_CURRENT_RACE:
			return {
				...state,
				currentRace: action.payload,
			};
		case CLEAR_CURRENT_RACE:
			return {
				...state,
				currentRace: null,
			};
		case GET_FEATURED_RACE:
			return {
				...state,
				featuredRace: state.availableRaces.filter(
					(race) => race.show === 'yes'
				),
			};
		case SET_SELECTED_RACE:
			return {
				...state,
				selectedRace: action.payload,
			};
		case CLEAR_SELECTED_RACE:
			return {
				...state,
				selectedRace: null,
			};
		case GET_RACES:
			return {
				...state,
				availableRaces: action.payload,
				loading: false,
			};
		case RACE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		case CONFIRM_RACE:
			return {
				...state,
				raceIsConfirmed: false,
			};
		case CLEAR_CONFIRMATION:
			return {
				...state,
				raceIsConfirmed: false,
			};
		default:
			return state;
	}
};
