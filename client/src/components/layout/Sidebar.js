import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarContext from '../../context/sidebar/sidebarContext';

const Sidebar = () => {
	const sidebarContext = useContext(SidebarContext);
	const { sidebarClassName, closeSidebar } = sidebarContext;

	const node = useRef();

	const onClick = () => {
		document.removeEventListener('click', handleClick);
		closeSidebar();
	};

	// useEffect shall run when sidbarClassName is changed
	useEffect(() => {
		if (sidebarClassName === 'sidebar') {
			// If sidebar just opened, add listener for click
			document.addEventListener('click', handleClick);
		} else {
			// if sidebar just closed remove listener
			document.removeEventListener('click', handleClick);
		}
		// eslint-disable-next-line
	}, [sidebarClassName]);

	const handleClick = (e) => {
		if (node.current.contains(e.target)) {
			// if click inside sidebar do nothing
			return;
		}
		// If click outside sidebar, remove listener, close sidebar
		document.removeEventListener('click', handleClick);
		closeSidebar();
	};

	return (
		<div className={sidebarClassName} ref={node}>
			<div className='container'>
				<h2>Sidebar</h2>
				<ul>
					<li>
						<Link to='/races' onClick={onClick} className='link'>
							Races
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
