import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import ShopHandlerContext from '../../context/shopHandler/shopHandlerContext';

const ProductAdmin = ({ product }) => {
	const shopHandlerContext = useContext(ShopHandlerContext);
	const { deleteProduct, setCurrentProduct, clearCurrentProduct } =
		shopHandlerContext;

	const { _id, name, price, amount, info, size } = product;

	const onDelete = () => {
		deleteProduct(_id);
		clearCurrentProduct();
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(amount < 1 ? 'badge-danger' : 'badge-success')
					}
				>
					Amount: {amount}
				</span>
			</h3>
			<ul>
				<li>Price: {price} kr</li>
				<li>Info: {info} </li>
				<li>Size: {size} </li>
			</ul>
			<button
				className='btn btn-primary btn-sm'
				onClick={() => setCurrentProduct(product)}
			>
				Edit
			</button>
			<button className='btn btn-primary btn-sm' onClick={onDelete}>
				Delete
			</button>
		</div>
	);
};

ProductAdmin.propTypes = {
	product: Proptypes.object.isRequired,
};

export default ProductAdmin;
