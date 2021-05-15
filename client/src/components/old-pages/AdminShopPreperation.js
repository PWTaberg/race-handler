import React from 'react';
import AvailableProductsForAdmin from '../adminShopHandler/AvailableProductsForAdmin';
import ProductsBuildForm from '../adminShopHandler/ProductBuildForm';

const AdminShopPreperation = () => {
    return (
        <div className='grid-2'>
            <div>
                <ProductsBuildForm />
            </div>
            <div>
                <AvailableProductsForAdmin />
            </div>
        </div>
    );
};

export default AdminShopPreperation;
