import {configureStore} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import products from './Products/products.slice';
import cart from './Cart/cart.slice'

const store = configureStore({
    reducer: {
        products,
        cart
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
//export const useAppDispatch = () => useDispatch<AppDispatch>()


export default store;