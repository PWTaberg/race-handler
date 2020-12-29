import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SidebarContext from '../../context/sidebar/sidebarContext';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logut } = authContext;
    const sidebarContext = useContext(SidebarContext);
    const { openSidebar, closeSidebar, sidebarClassName } = sidebarContext;
    const onClick = () => {
        if (sidebarClassName === 'sidebar close') {
            openSidebar();
        } else {
            closeSidebar();
        }
    };

    const onLogout = () => {
        logut();
    };

    const adminLinks = (
        <Fragment>
            <li>
                <Link to='/admin-shop-preperation' style={{ color: 'black' }}>
                    ShopAdmin
                </Link>
            </li>
            <li>
                <Link to='/admin-race-preperation' style={{ color: 'black' }}>
                    RaceAdmin
                </Link>
            </li>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <li>
                <Link to='/' style={{ color: 'black' }}>Home</Link>
            </li>
            <li>
                <Link to='/shop' style={{ color: 'black' }}>Shop</Link>
            </li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logut</span>
                </a>
            </li>
            <button style={{ paddingRight: '10px', paddingLeft: '10px', borderRadius: '10px' }} onClick={onClick}>
                <i className="fas fa-bars"></i>
            </button>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/' style={{ color: 'black' }}>Home</Link>
            </li>
            <li>
                <Link to='/shop' style={{ color: 'black' }}>Shop</Link>
            </li>
            <li>
                <Link to='/login' style={{ color: 'black' }}>Login</Link>
            </li>
            <button style={{ paddingRight: '10px', paddingLeft: '10px', borderRadius: '10px' }} onClick={onClick}>
                <i className="fas fa-bars"></i>
            </button>
        </Fragment>
    );

    return (
        <div className='navbar'>
            <h1>
                {title}
            </h1>
            <ul>{isAuthenticated && adminLinks}</ul>
            {' '}
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
    title: 'Run For Joy'
};

export default Navbar;
