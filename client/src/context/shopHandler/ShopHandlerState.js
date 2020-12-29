import React, { useReducer } from 'react';
import axios from 'axios';
import ShopHandlerContext from './shopHandlerContext';
import shopHandlerReducer from './shopHandlerReducer';
import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    SET_CURRENT_PRODUCT,
    CLEAR_CURRENT_PRODUCT,
    UPDATE_PRODUCT,
    GET_PRODUCTS,
    PRODUCT_ERROR,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CONFIRM_ORDER,
    CLEAR_ORDER
} from '../typesLibrary';

const ShopHandlerState = props => {
    const initialState = {
        availableProducts: null,
        currentProduct: null,
        loading: true,
        error: null,
        shoppingCart: [],
        shoppingTotal: 0,
        orderConfirmed: false
    };

    const [state, dispatch] = useReducer(shopHandlerReducer, initialState);

    const addProduct = async product => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/v1/product-list', product, config);
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data.newProduct
            });
        } catch (err) {
            dispatch({ type: PRODUCT_ERROR, payload: err.response.data.error })
        }
    };

    const deleteProduct = async _id => {
        try {
            await axios.delete(`/api/v1/product-list/${_id}`);
            dispatch({
                type: DELETE_PRODUCT,
                payload: _id
            });
        } catch (err) {
            dispatch({ type: PRODUCT_ERROR, payload: err.response.data.error })
        }
    };

    const setCurrentProduct = product => {
        dispatch({ type: SET_CURRENT_PRODUCT, payload: product });
    };

    const clearCurrentProduct = () => {
        dispatch({ type: CLEAR_CURRENT_PRODUCT });
    };

    const updateProduct = async product => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/v1/product-list/${product._id}`, product, config);
            dispatch({
                type: UPDATE_PRODUCT,
                payload: res.data.updatedProduct
            });
        } catch (err) {
            dispatch({ type: PRODUCT_ERROR, payload: err.response.data.error })
        }
    };

    const getProducts = async () => {
        try {
            const res = await axios.get('/api/v1/product-list');
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data.productList
            });
        } catch (err) {
            dispatch({ type: PRODUCT_ERROR, payload: err.response.data.error })
        }
    };

    const addToCart = product => {
        dispatch({ type: ADD_TO_CART, payload: product })
    };

    const removeFromCart = product => {
        dispatch({ type: REMOVE_FROM_CART, payload: product })
    };

    const setConfirmedOrder = () => dispatch({ type: CONFIRM_ORDER });

    const clearOrder = () => dispatch({ type: CLEAR_ORDER });

    return (
        <ShopHandlerContext.Provider
            value={{
                availableProducts: state.availableProducts,
                currentProduct: state.currentProduct,
                loading: state.loading,
                error: state.error,
                shoppingCart: state.shoppingCart,
                shoppingTotal: state.shoppingTotal,
                orderConfirmed: state.orderConfirmed,
                addProduct,
                deleteProduct,
                setCurrentProduct,
                clearCurrentProduct,
                updateProduct,
                getProducts,
                addToCart,
                removeFromCart,
                setConfirmedOrder,
                clearOrder
            }}>
            {props.children}
        </ShopHandlerContext.Provider>
    );
};

export default ShopHandlerState;