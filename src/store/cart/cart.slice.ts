import { getCookieDataCart, saveCartToCookie } from '@/utils/cookie.hepler'
import { getStoreLocal } from '@/utils/getStoreLocal'
import { createSlice } from '@reduxjs/toolkit'
import { InitialState, UserSingleProductCartWithCount } from './cart.interface'

const initialState: InitialState = {
	userCart: getStoreLocal('userCart') || [],
	itemListCount: getCookieDataCart('cartCountList')
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCartArray: (state, { payload }) => {
			state.userCart = payload
		},

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
				saveCartToCookie(state.itemListCount)
			} else {
				state.userCart.push(payload)
				state.itemListCount.push({
					id: payload.id,
					count: payload.count,
					paymentType: payload.paymentType,
					type: payload.type,
					subscriptionPeriod: payload.subscriptionPeriod,
					subscriptionPrice: payload.subscriptionPrice,
					variableItems: payload.variableItems,
					bundleItems: payload.bundleItems,
					itemImage: payload.images[0].src
				})
				saveCartToCookie(state.itemListCount)
			}
			saveCartToCookie(state.itemListCount)
		},

		addToCart: (state, { payload }) => {
			const findCart = state.userCart.find(
				product => product.id === payload.product.id
			)
			const itemListCart = state.itemListCount.find(
				item => item.id === payload.product.id
			)

			if (!itemListCart && !findCart) {
				state.userCart.push(payload.product)
				state.itemListCount.push({
					id: payload.product.id,
					count: payload.count,
					paymentType: payload.paymentType,
					type: payload.type,
					bundleItems: payload.bundleItems,
					variableItems: payload.variableItems,
					subscriptionPeriod: payload.subscriptionPeriod,
					subscriptionPrice: payload.subscriptionPrice,
					itemImage: payload.product.images[0].src
				})
				saveCartToCookie(state.itemListCount)
			}

			if (itemListCart) {
				itemListCart.count += payload.count
				saveCartToCookie(state.itemListCount)
			}
			saveCartToCookie(state.itemListCount)
		}
	}
})

export const { toggleCartProduct, addToCart, addCartArray } = cartSlice.actions
export const { reducer } = cartSlice
