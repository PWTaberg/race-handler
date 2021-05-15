import React, { useState, useContext, useEffect } from 'react';
//import AuthContext from '../../context/auth/authContext';
import AuthContext from '../context/auth/authContext';

//import AlertContext from '../../context/alert/alertContext';
import AlertContext from '../context/alert/alertContext';

import { Link } from 'react-router-dom';

const Login = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	// in case of error, change in authorisation, history
	useEffect(() => {
		// If already logged in
		if (isAuthenticated) {
			props.history.push('/');
		}

		// Login failed
		if (error === 'Invalid credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		// Check that all fields are filled in
		if (email === '' || password === '') {
			setAlert('Fill in all fields', 'danger');
		} else {
			// Try to login
			login({
				email,
				password,
			});
		}
	};

	return (
		<div className='form-container'>
			<h1 className='titleText'>
				Account <span>Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email' style={labelStyle}>
						Email Address
					</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password' style={labelStyle}>
						Password
					</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<p style={labelStyle}>
					If you don't have an account,
					<Link to='/register' style={linkStyle}>
						<b> Register Here</b>
					</Link>
				</p>
				<input
					type='submit'
					value='Login'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

const linkStyle = {
	color: 'blue',
	backgroundColor: 'rgba(255, 255, 255, 0.7)',
	borderRadius: '4px',
};

const labelStyle = {
	color: 'white',
};

export default Login;
