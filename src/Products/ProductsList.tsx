import { useSelector } from 'react-redux';
import React from 'react';
import { getProductsSelector, Product, removeProduct, selectAllProducts, selectPrductEntities, selectProductById, selectProductsIds, selectTotalProducts } from './products.slice';
import { useAppDispatch } from '../store.hooks';
import { addToCart } from '../Cart/cart.slice';
import { RootState } from '../store';

const ProductsList: React.FC = () => {

    const products = useSelector(selectAllProducts)
    const id = useSelector<RootState>(state => selectProductById(state, 1))
    const totalNumberOfProducts = useSelector(selectTotalProducts);
    const productsIds = useSelector(selectProductsIds);
    const entities = useSelector(selectPrductEntities)

    console.log(id)
    console.log(totalNumberOfProducts)
    console.log(productsIds)
    console.log(entities)
    console.log(entities[2])
    console.log(entities[3])

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