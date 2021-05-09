import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const ConfirmRace = () => {
	const raceHandlerContext = useContext(RaceHandlerContext);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const history = useHistory();

	const [stripePublicKey, setStripePublicKey] = useState('');
	// stripe
	//Antons key const Stripe_public = 'pk_test_7BSkiYCY4f3PLHOBdDybsy5t00qSd6Ck5m';
	//let Stripe_public = 'pk_test_IkaBs3zE3qH12IO1ENSNkX7q00kgLs1P7x';

	useEffect(() => {
		if (stripePublicKey === '') {
			const getStripeKey = async () => {
				try {
					const result = await axios.get('/api/v1/config/stripe');
					setStripePublicKey(result.data);
				} catch (err) {
					console.err('Error fetching Stripe Key');
				}
			};

			getStripeKey();
		}
	}, [stripePublicKey]);

	const {
		selectedRace,
		clearSelectedRace,
		clearConfirmation,
		setRaceConfirmed,
		handlePayment,
	} = raceHandlerContext;

	const { isAuthenticated, user } = authContext;
	const { setAlert } = alertContext;

	// local state for payment handling
	const [showPaymentHandler, setShowPaymentHandler] = useState(false);

	const cancelRegistration = () => {
		clearConfirmation();
		clearSelectedRace();
		// Stripe, hide payment dialog
		setShowPaymentHandler(false);
	};

	const confirmRace = () => {
		if (isAuthenticated) {
			setRaceConfirmed();

			// Stripe, make payment possible
			setShowPaymentHandler(true);

			/* history.push('/race-checkout');
            setAlert('You are registered', 'success'); */
		} else {
			setAlert('Log in to signup for race', 'danger');
		}
	};

	if (selectedRace === null) {
		// If no race is selected jump back to first page
		// this should not happen, but if it still does ...

		// Stripe, make payment possible
		history.push('/');

		return null;
	}

	// Stripe, make payment possible
	const { name, price } = selectedRace;

	const product = {
		name: name,
		price: price,
		productBy: 'RunForJoy',
	};

	// Stripe
	const makePayment = (token) => {
		const runner = user.name;
		const raceId = selectedRace._id;

		// call server for payment
		handlePayment(token, product, runner, raceId);
		setAlert(`You are now registred for ${name}`, 'success');

		// Stripe, make payment possible
		// setShowPaymentHandler(false);
		clearSelectedRace();

		history.push('/');
	};

	// Stripe component in variabke...
	let paymentComponent;

	if (showPaymentHandler === true) {
		paymentComponent = (
			<Fragment>
				<StripeCheckout
					//stripeKey={Stripe_public}
					stripeKey={stripePublicKey}
					token={makePayment}
					name='Run For Joy'
					amount={product.price * 100}
					currency='SEK'
				>
					<button className='btn btn-large btn-primary'>
						{' '}
						Continue with payment
					</button>
				</StripeCheckout>
			</Fragment>
		);
	}

	return (
		<div className='card bg-light'>
			<h2>Selected Race</h2>
			<h3 className='text-left'>{name}</h3>
			<ul>
				<li>Price: {price} kr</li>
			</ul>
			{showPaymentHandler === false && (
				<button className='btn btn-success' onClick={confirmRace}>
					Confirm Registration
				</button>
			)}

			{paymentComponent}
			<button className='btn btn-danger' onClick={cancelRegistration}>
				Cancel
			</button>
		</div>
	);
};

export default ConfirmRace;
