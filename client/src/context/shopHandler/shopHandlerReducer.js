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

export default (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                availableProducts: [...state.availableProducts, action.payload],
                loading: false
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product._id !== action.payload),
                loading: false
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.map(product =>
                    product._id === action.payload._id ? action.payload : product
                ),
                loading: false
            };
        case SET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.payload
            };
        case CLEAR_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: null
            };
        case GET_PRODUCTS:
            return {
                ...state,
                availableProducts: action.payload,
                loading: false
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case ADD_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload],
                shoppingTotal: state.shoppingTotal + action.payload.price
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(product => product._id !== action.payload),
                shoppingTotal: state.shoppingTotal - action.payload.price
            };
        case CONFIRM_ORDER:
            return {
                ...state,
                orderConfirmed: true
            };
        case CLEAR_ORDER:
            return {
                ...state,
                orderConfirmed: false
            };
        default:
            return state;
    }
};