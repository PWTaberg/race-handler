import React, { useState, useContext, useEffect } from 'react';
import ShopHandlerContext from '../../context/shopHandler/shopHandlerContext';

const ProductBuildForm = () => {
	const shopHandlerContext = useContext(ShopHandlerContext);
	const { addProduct, updateProduct, clearCurrentProduct, currentProduct } =
		shopHandlerContext;

	useEffect(() => {
		if (currentProduct !== null) {
			setProduct(currentProduct);
		} else {
			setProduct({
				name: '',
				price: '',
				amount: '',
				info: '',
				size: '-',
			});
		}
	}, [shopHandlerContext, currentProduct]);

	const [product, setProduct] = useState({
		name: '',
		price: '',
		amount: '',
		info: '',
		size: '-',
	});

	const { name, price, amount, info, size } = product;

	const onChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (currentProduct === null) {
			addProduct(product);
		} else {
			updateProduct(product);
		}
		clearAll();

		setProduct({
			name: '',
			price: '',
			amount: '',
			info: '',
			size: '-',
		});
	};

	const clearAll = () => {
		clearCurrentProduct();
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='form-group'>
				<h2 className='text-primary'>
					{currentProduct ? 'Edit Product' : 'Add Product'}
				</h2>
				<input
					type='text'
					placeholder='Name'
					name='name'
					value={name}
					onChange={onChange}
				/>
				<input
					type='number'
					placeholder='Price'
					name='price'
					value={price}
					onChange={onChange}
				/>
				<input
					type='number'
					placeholder='Amount'
					name='amount'
					value={amount}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Info'
					name='info'
					value={info}
					onChange={onChange}
				/>
				<input
					type='text'
					placeholder='Size'
					name='size'
					value={size}
					onChange={onChange}
				/>
				<div>
					<input
						type='submit'
						value={
							currentProduct ? 'Update Product' : 'Add Product'
						}
						className='btn btn-primary btn-block'
					/>
				</div>
			</div>
			{currentProduct && (
				<div>
					{' '}
					<button
						className='btn btn-light btn-block'
						onClick={clearAll}
					>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ProductBuildForm;
