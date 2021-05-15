import React from 'react';
//import AvailableProductsForAdmin from '../adminShopHandler/AvailableProductsForAdmin';
import ProductListAdmin from '../components/shopComponents/ProductListAdmin';
//import ProductsBuildForm from '../adminShopHandler/ProductBuildForm';
import ProductsBuildForm from '../components/shopComponents/ProductBuildForm';

const ProductListAdminScreen = () => {
	return (
		<div className='grid-2'>
			<div>
				<ProductsBuildForm />
			</div>
			<div>
				<ProductListAdmin />
			</div>
		</div>
	);
};

export default ProductListAdminScreen;
