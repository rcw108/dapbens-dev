import { createSlice } from '@reduxjs/toolkit'
import { InitialState, UserSingleProductCartWithCount } from './cart.interface'

const initialState: InitialState = {
	userCart: [],
	itemListCount: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggleCartProduct: (
			state,
			{ payload }: { payload: UserSingleProductCartWithCount }
		) => {
			const product = state.userCart.find(product => product.id === payload.id)
			const countListItem = state.itemListCount.find(
				item => item.id === payload.id
			)

			if (product && countListItem) {
				const index = state.userCart.indexOf(product)
				const countIndex = state.itemListCount.indexOf(countListItem)
				state.userCart.splice(index, 1)
				state.itemListCount.splice(countIndex, 1)
			} else {
				state.userCart.push(payload)
				state.itemListCount.push({ id: payload.id, count: payload.count })
			}
		},

		addToCart: (state, { payload }) => {
			const findCart = state.userCart.find(product => product.id === payload.id)
			const itemListCart = state.itemListCount.find(
				item => item.id === payload.id
			)

			if (!itemListCart && !findCart) {
				state.userCart.push(payload)
				state.itemListCount.push({ id: payload.id, count: payload.count })
			}

			if (itemListCart) {
				itemListCart.count += payload.count
			}
		}
	}
})

export const { toggleCartProduct, addToCart } = cartSlice.actions
export const { reducer } = cartSlice
