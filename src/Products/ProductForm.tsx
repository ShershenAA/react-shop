import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import { title } from 'process';
import react, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store.hooks';
import { addProduct, addProductAsync, getErrorMessage, Product } from './products.slice';


const ProductsForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const errorMessage = useSelector(getErrorMessage)

    const [product , setProduct] = useState<Product>({
        id: 0,
        title: '',
        price: 0
    })

    const handleChange = ({target:{name, value}}: React.ChangeEvent<HTMLInputElement>) => setProduct(prev =>{
        (prev as any)[name] = value;
        const newValue = {...prev};
        return newValue;
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addProductAsync(product))
    }
      
    const {title, price, id} = product;

    return (<>
    <h2>Add Game to the Store</h2>
    {errorMessage && <span>error: {errorMessage}</span>}
    <form onSubmit={handleSubmit}>
        <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} type="text" placeholder='Title' name='title' value = {title} onChange = {handleChange}/>
        <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} type="number" placeholder='Price' name='price' value = {price} onChange = {handleChange}/>
        <input style={{border: errorMessage ? '1px solid red':'1px solid black'}} type="number" placeholder='Id' name='id' value = {id} onChange = {handleChange}/>
        <button style={{background: errorMessage ? 'red':'grey'}} type='submit'>Add Product</button>
    </form>
    </>);
}

export default ProductsForm