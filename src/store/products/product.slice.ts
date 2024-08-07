import { getStoreLocal } from '@/utils/getStoreLocal'
import { createSlice } from '@reduxjs/toolkit'
import { getAllProducts } from './product.actions'
import { InitialState } from './product.interface'

const initialState: InitialState = {
	products: getStoreLocal('products'),
	isLoading: false
}

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllProducts.pending, state => {
				state.isLoading = true
			})
			.addCase(getAllProducts.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.products = payload
			})
			.addCase(getAllProducts.rejected, state => {
				state.isLoading = false
				state.products = null
			})
	}
})

export const { reducer } = productSlice
