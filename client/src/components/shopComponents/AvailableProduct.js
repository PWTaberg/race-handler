import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import ShopHandlerContext from '../../context/shopHandler/shopHandlerContext';

const AvailableProduct = ({ product }) => {
	const shopHandlerContext = useContext(ShopHandlerContext);
	const { addToCart } = shopHandlerContext;
	const { name, price, amount, info, size } = product;
	const onClick = () => {
		addToCart(product);
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>{name}</h3>
			<span
				style={{ marginLeft: '0' }}
				className={
					'badge ' + (amount < 1 ? 'badge-danger' : 'badge-success')
				}
			>
				Amount: {amount}
			</span>
			<br />
			Price: {price} kr <br />
			Info: {info} <br />
			Size: {size}
			<button
				className='btn btn-primary btn-sm'
				style={{ float: 'right' }}
				onClick={onClick}
			>
				Buy
			</button>
		</div>
	);
};

AvailableProduct.propTypes = {
	product: Proptypes.object.isRequired,
};

export default AvailableProduct;
