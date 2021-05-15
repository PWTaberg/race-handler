import React, { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarContext from '../../context/sidebar/sidebarContext';

const Sidebar = () => {
	const sidebarContext = useContext(SidebarContext);
	const { sidebarClassName, closeSidebar } = sidebarContext;

	// useRef - holds a reference to the sidebar element -I think
	// so that we can use the same element further down in the code
	const node = useRef();

	// Click anywhere on the screen will cause sidebar to close
	// remove event listener that was created before
	const onClick = () => {
		document.removeEventListener('click', handleClick);
		closeSidebar();
	};

	// useEffect shall run when sidbarClassName is changed
	useEffect(() => {
		if (sidebarClassName === 'sidebar') {
			// If sidebar just opened, add listener for click
			// So that we can close it when clicked anywhere on the screen
			document.addEventListener('click', handleClick);
		} else {
			// if sidebar just closed remove listener
			document.removeEventListener('click', handleClick);
		}
		// eslint-disable-next-line
	}, [sidebarClassName]);

	const handleClick = (e) => {
		// Here we use node to check if the click was from inside the sidebar
		if (node.current.contains(e.target)) {
			// if click inside sidebar do nothing
			return;
		}
		// If click is from outside the sidebar, remove listener, close sidebar
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
