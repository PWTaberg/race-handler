import React, { useReducer } from 'react';
import SidebarContext from './sidebarContext';
import sidebarReducer from './sidebarReducer';
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../typesLibrary';

const SidebarState = props => {
    const initialState = {
        sidebarClassName: 'sidebar close'
    };

    const [state, dispatch] = useReducer(sidebarReducer, initialState);

    const openSidebar = () => {
        dispatch({ type: OPEN_SIDEBAR, payload: 'sidebar' });
    };

    const closeSidebar = () => {
        dispatch({ type: CLOSE_SIDEBAR, payload: 'sidebar close' });
    };

    return (
        <SidebarContext.Provider
            value={{
                sidebarClassName: state.sidebarClassName,
                openSidebar,
                closeSidebar
            }}
        >
            {props.children}
        </SidebarContext.Provider>
    );
};

export default SidebarState;