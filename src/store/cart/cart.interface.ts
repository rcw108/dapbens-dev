import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export interface UserSingleProductCartWithCount
	extends WooCommerceSingleProduct {
	count: number
}

export interface InitialState {
	userCart: UserSingleProductCartWithCount[]
	itemListCount: {
		id: number
		count: number
	}[]
}
