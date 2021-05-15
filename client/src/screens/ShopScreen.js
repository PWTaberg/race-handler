import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
//import AvailableProducts from '../shopHandler/AvailableProducts';
import AvailableProductList from '../components/shopComponents/AvailableProductList';
//import ShopHandlerContext from '../../context/shopHandler/shopHandlerContext';
import ShopHandlerContext from '../context/shopHandler/shopHandlerContext';

const Shop = () => {
	const shopHandlerContext = useContext(ShopHandlerContext);
	const items = shopHandlerContext.shoppingCart.length;
	const history = useHistory();

	const onClick = () => {
		history.push('/checkout');
	};

	return (
		<div>
			<button
				style={{
					float: 'right',
					borderRadius: '10px',
					paddingRight: '10px',
					paddingLeft: '10px',
				}}
				className='btn btn-md'
				onClick={onClick}
			>
				<i className='fas fa-shopping-cart'> {items}</i>
			</button>
			<h1 className='text-center'>Shop</h1>
			<div>
				<div>
					<AvailableProductList />
				</div>
			</div>
		</div>
	);
};

export default Shop;
