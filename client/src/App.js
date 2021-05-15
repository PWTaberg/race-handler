import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
//import Home from './components/pages/Home';
import HomeScreen from './screens/HomeScreen';

//import Shop from './components/pages/Shop';
import ShopScreen from './screens/ShopScreen';

//import Races from './components/pages/Races';
import AvailableRaceListScreen from './screens/AvailableRaceListScreen';

//import AdminShopPreparation from './components/pages/AdminShopPreperation';
import ProductListAdminScreen from './screens/ProductListAdminScreen';

//import AdminRacePreparation from './components/pages/AdminRacePreperation';
import RaceListAdminScreen from './screens/RaceListAdminScreen';

import Sidebar from './components/layout/Sidebar';
//import Register from './components/auth/Register';
import RegisterScreen from './screens/RegisterScreen';

//import Login from './components/auth/Login';
import LoginScreen from './screens/LoginScreen';

import Alerts from './components/layout/Alerts';
//import RaceCheckout from './components/checkout/RaceCheckout';
import RaceCheckoutScreen from './screens/RaceCheckoutScreen';

import SidebarState from './context/sidebar/SidebarState';
import RaceHandlerState from './context/raceHandler/RaceHandlerState';
import ShopHandlerState from './context/shopHandler/ShopHandlerState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<RaceHandlerState>
				<ShopHandlerState>
					<AlertState>
						<SidebarState>
							<Router>
								<Fragment>
									<Navbar />
									<div className='container'>
										<Sidebar />
										<Alerts />
										<Switch>
											<Route
												exact
												path='/'
												component={HomeScreen}
											/>
											<Route
												exact
												path='/shop'
												component={ShopScreen}
											/>
											<Route
												exact
												path='/races'
												component={
													AvailableRaceListScreen
												}
											/>
											<Route
												exact
												path='/register'
												component={RegisterScreen}
											/>
											<Route
												exact
												path='/login'
												component={LoginScreen}
											/>
											<Route
												exact
												path='/race-checkout'
												component={RaceCheckoutScreen}
											/>

											<Route
												exact
												path='/product-list-admin'
												component={
													ProductListAdminScreen
												}
											/>
											<Route
												exact
												path='/race-list-admin'
												component={RaceListAdminScreen}
											/>
										</Switch>
									</div>
								</Fragment>
							</Router>
						</SidebarState>
					</AlertState>
				</ShopHandlerState>
			</RaceHandlerState>
		</AuthState>
	);
};

export default App;
