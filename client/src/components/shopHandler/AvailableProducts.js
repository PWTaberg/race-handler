import React, { Fragment, useContext, useEffect } from 'react';
import AvailableProductsItem from './AvailableProductsItem';
import ShopHandlerContext from '../../context/shopHandler/shopHandlerContext';
import Spinner from '../layout/Spinner';

const AvailableProducts = () => {
    const shopHandlerContext = useContext(ShopHandlerContext);
    const { availableProducts, getProducts, loading } = shopHandlerContext;

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, []);

    if (availableProducts !== null && availableProducts.length === 0 && !loading) {
        return (
            <Fragment>
                <h2 className='text-primary text-center'>No products currently available</h2>
            </Fragment>
        );
    }

    if (availableProducts !== null && !loading) {
        return (
            <Fragment>
                <div className='grid-3'>
                    {availableProducts.map(product => (
                        <AvailableProductsItem key={product._id} product={product} />
                    ))}
                </div>
            </Fragment>
        );
    }

    if (loading) {
        return (
            <Fragment>
                <Spinner />
            </Fragment>
        );
    }
};

export default AvailableProducts;
