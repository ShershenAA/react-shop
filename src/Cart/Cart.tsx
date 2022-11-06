import React from 'react';
import { useAppDispatch, useAppSelector } from '../store.hooks';
import { getCartProducts, getTotalPrice, removeFromCart } from './cart.slice';


const Cart: React.FC = () => {
    
    const cartProducts = useAppSelector(getCartProducts);
    const totalPrice = useAppSelector(getTotalPrice)
    const dispatch = useAppDispatch()

    const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId))

    return (<>
    <h2>Cart</h2>
    <h5>{totalPrice}</h5>
    {cartProducts.map(product => (
        <div key={product.id}>
            <span>{product.title}</span>
            <span>{product.amount}</span>
            <button onClick ={() => handleRemoveFromCart(product.id)}>Remove from Cart</button>
        </div>
    ))}
    </>);
}

export default Cart