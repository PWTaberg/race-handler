import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import Races from './components/pages/Races';
import AdminShopPreparation from './components/pages/AdminShopPreperation';
import AdminRacePreparation from './components/pages/AdminRacePreperation';

import Sidebar from './components/layout/Sidebar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import RaceCheckout from './components/checkout/RaceCheckout';

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
												component={Home}
											/>
											<Route
												exact
												path='/shop'
												component={Shop}
											/>
											<Route
												exact
												path='/races'
												component={Races}
											/>
											<Route
												exact
												path='/register'
												component={Register}
											/>
											<Route
												exact
												path='/login'
												component={Login}
											/>
											<Route
												exact
												path='/race-checkout'
												component={RaceCheckout}
											/>

											<Route
												exact
												path='/admin-shop-preparation'
												component={AdminShopPreparation}
											/>
											<Route
												exact
												path='/admin-race-preparation'
												component={AdminRacePreparation}
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
