import { getStoreLocal } from '@/utils/getStoreLocal'
import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './product.interface'

const initialState: InitialState = {
	products: getStoreLocal('products'),
	popularCategories: [],
	isLoading: false
}

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		pushAllProducts: (state, { payload }) => {
			state.products = payload
		},
		setPopularCategories: (state, { payload }) => {
			state.popularCategories = payload
		}
	}
})

export const { pushAllProducts, setPopularCategories } = productSlice.actions
export const { reducer } = productSlice
