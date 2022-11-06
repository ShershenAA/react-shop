import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import validateProduct from '../fake.api'
import { RootState } from '../store'

export interface Product{
    title: string,
    price: number,
    id: number
}

export enum ValidationState{
    FullFulled,
    Pending,
    Rejected
}

interface ProductsSliceState {
    products: Product[],
    validationState?: ValidationState,
    errorMessage?: string
}

export const addProductAsync = createAsyncThunk ('products/addNewProduct', async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct);
    return product;
})

const initialProducts: Product[] = [
    {title: 'Prod_1', price: 10, id: 1},
    {title: 'Prod_2', price: 20, id: 2},
    {title: 'Prod_3', price: 30, id: 3},
    {title: 'Prod_4', price: 40, id: 4}
]

const initialState: ProductsSliceState = {
    products: initialProducts,
    validationState: undefined,
    errorMessage: undefined
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        addProduct: (state, action: PayloadAction<Product>) => {
            //return [action.payload, ...state]
            state.products.push(action.payload)
        },

        removeProduct: (state, action: PayloadAction<number>) => ({
            ...state,
            products: state.products.filter(product => product.id !== action.payload)  
        })       
    },
    extraReducers: builder => {
        builder.addCase(addProductAsync.fulfilled, (state, action) => ({
            ...state,
            validationState: ValidationState.FullFulled,
            errorMessage: undefined,
            products: [...state.products, action.payload]
        }))
        builder.addCase(addProductAsync.rejected, (state, action) => ({
            ...state,
            validationState: ValidationState.Rejected,
            errorMessage: action.error.message           
        }))
        builder.addCase(addProductAsync.pending, (state, action) => ({
            ...state,
            validationState: ValidationState.Pending,
            errorMessage: undefined
           
        }))
    }
})
export const {addProduct, removeProduct} = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products.products;
export const getErrorMessage = (state: RootState) => state.products.errorMessage;

export default productsSlice.reducer;