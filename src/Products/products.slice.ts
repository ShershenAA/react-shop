import { createAsyncThunk, createSlice, PayloadAction, createEntityAdapter} from '@reduxjs/toolkit'
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

const productAdapter  = createEntityAdapter<Product>()
const initialState = productAdapter.getInitialState<ProductsSliceState>({
    errorMessage: undefined,
    validationState: undefined
})

const filledInitialState = productAdapter.upsertMany(initialState, initialProducts)

const productsSlice = createSlice({
    name: 'products',
    initialState: filledInitialState,
    reducers:{
        addProduct: (state, action: PayloadAction<Product>) => {
            productAdapter.upsertOne(state, action.payload)
        },

        removeProduct: (state, action: PayloadAction<number>) => {
            productAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload)
            state.validationState= ValidationState.FullFulled
            state.errorMessage = undefined
        })
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

export const getProductsSelector = (state: RootState) => state.products.entities;
export const getErrorMessage = (state: RootState) => state.products.errorMessage;

export const {
selectAll: selectAllProducts,
selectById: selectProductById,
selectEntities: selectPrductEntities,
selectIds: selectProductsIds,
selectTotal: selectTotalProducts
} = productAdapter.getSelectors<RootState>(state => state.products)

export default productsSlice.reducer;