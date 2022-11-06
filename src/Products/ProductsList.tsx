import { useSelector } from 'react-redux';
import React from 'react';
import { getProductsSelector, Product, removeProduct } from './products.slice';
import { useAppDispatch } from '../store.hooks';
import { addToCart } from '../Cart/cart.slice';

const ProductsList: React.FC = () => {

    const products = useSelector(getProductsSelector)
    const dispatch = useAppDispatch()

    const removeFromStore = (id:number) => dispatch(removeProduct(id))    

    const addToCartHandler = (product: Product) => dispatch(addToCart(product))

    return (
        <div>
            <h2>Games List</h2>
            {products.map(product => <div key={product.id}>
                <span>{`${product.title} : ${product.price}`}</span>
                <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
                <button onClick={() => removeFromStore(product.id)}>Remove product</button>
                </div>)}
        </div>

        
    );
}

export default ProductsList