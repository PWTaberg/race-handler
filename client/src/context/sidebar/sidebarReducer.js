import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../typesLibrary';

export default (state, action) => {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {
                ...state,
                sidebarClassName: action.payload
            };
        case CLOSE_SIDEBAR:
            return {
                ...state,
                sidebarClassName: action.payload
            };
        default:
            return state;
    }
};