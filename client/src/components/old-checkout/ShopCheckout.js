import React, { Fragment, useContext } from 'react';
import ShopHandlerContext from '../../context/shopHandler/shopHandlerContext';
import ShopCheckoutItem from './ShopCheckoutItem';

const ShopCheckout = () => {
    const shopHandlerContext = useContext(ShopHandlerContext);
    const { shoppingCart } = shopHandlerContext;

    if (shoppingCart !== null && shoppingCart.length === 0) {
        return <h4>No products in cart</h4>;
    }

    if (shoppingCart !== null) {
        return (
            <Fragment>
                {
                    shoppingCart.map(product => (
                        <ShopCheckoutItem key={product._id} product={product} />
                    ))
                }
            </Fragment>
        );
    }
};

export default ShopCheckout;
