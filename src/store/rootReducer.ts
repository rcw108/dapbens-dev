import { reducer as cartReducer } from './cart/cart.slice'
import { reducer as productReducer } from './products/product.slice'

export const reducers = {
	products: productReducer,
	cart: cartReducer
}
