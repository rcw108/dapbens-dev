import { getStoreLocal } from '@/utils/getStoreLocal'
import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './product.interface'

const initialState: InitialState = {
	products: getStoreLocal('products'),
	isLoading: false
}

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		pushAllProducts: (state, { payload }) => {
			state.products = payload
		}
	}
})

export const { pushAllProducts } = productSlice.actions
export const { reducer } = productSlice
