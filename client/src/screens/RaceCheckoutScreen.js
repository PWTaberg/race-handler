import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
//import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';
import RaceHandlerContext from '../context/raceHandler/raceHandlerContext';
//import AlertContext from '../../context/alert/alertContext';
import AlertContext from '../context/alert/alertContext';

import StripeCheckout from 'react-stripe-checkout';

const RaceCheckout = () => {
	const alertContext = useContext(AlertContext);
	const raceHandlerContext = useContext(RaceHandlerContext);
	const history = useHistory();

	const Stripe_public = 'pk_test_IkaBs3zE3qH12IO1ENSNkX7q00kgLs1P7x';

	const { selectedRace, handlePayment } = raceHandlerContext;
	const { setAlert } = alertContext;

	if (selectedRace === null) {
		history.push('/');
		return null;
	}

	const { name, price } = selectedRace;

	const product = {
		name: name,
		price: price,
		productBy: 'RunForJoy',
	};

	const makePayment = (token) => {
		handlePayment(token, product);
		setAlert(`You are now registerd for ${name}`, 'success');
		history.push('/');
	};

	/*
  const makePayment = async token => {
    const body = {
      token,
      product
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/v1/race-list/payment', body, config);

      setAlert(`You are now registerd for ${name}`, 'success');
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  */

	return (
		<Fragment>
			<h1>Payment</h1>

			<StripeCheckout
				stripeKey={Stripe_public}
				token={makePayment}
				name='Run For Joy'
				amount={product.price * 100}
			>
				<button className='btn-large btn-primary'>
					{' '}
					Continue with payment
				</button>
			</StripeCheckout>
		</Fragment>
	);
};

export default RaceCheckout;
