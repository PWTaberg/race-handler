import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RaceHandlerContext from '../../context/raceHandler/raceHandlerContext';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import StripeCheckout from 'react-stripe-checkout';

const ConfirmRace = () => {
    const raceHandlerContext = useContext(RaceHandlerContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const history = useHistory();

    const Stripe_public = 'pk_test_7BSkiYCY4f3PLHOBdDybsy5t00qSd6Ck5m';

    const { selectedRace, clearSelectedRace, clearConfirmation, setRaceConfirmed, handlePayment } = raceHandlerContext;
    const { isAuthenticated, user } = authContext;
    const { setAlert } = alertContext;

    const [showPaymentHandler, setShowPaymentHandler] = useState(false);

    const cancelRegistration = () => {
        clearConfirmation();
        clearSelectedRace();
        setShowPaymentHandler(false);
    };

    const confirmRace = () => {
        if (isAuthenticated) {
            setRaceConfirmed();

            setShowPaymentHandler(true);

            /* history.push('/race-checkout');
            setAlert('You are registered', 'success'); */
        } else {
            setAlert('Log in to signup for race', 'danger');
        }
    };

    if (selectedRace === null) {
        history.push('/');

        return null;
    }

    const { name, price } = selectedRace;

    const product = {
        name: name,
        price: price,
        productBy: 'RunForJoy'
    };

    const makePayment = (token) => {
        const runner = user.name;
        const raceId = selectedRace._id;

        handlePayment(token, product, runner, raceId);
        setAlert(`You are now registred for ${name}`, 'success');

        history.push('/');
    };

    let paymentComponent;

    if (showPaymentHandler === true) {
        paymentComponent = (
            <Fragment>
                <StripeCheckout
                    stripeKey={Stripe_public}
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
            <h3 className='text-left'>
                {name}
            </h3>
            <ul>
                <li>
                    Price: {price} kr
                </li>
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
