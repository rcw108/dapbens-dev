import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export interface InitialState {
	products: WooCommerceSingleProduct[] | null
	isLoading: boolean
	popularCategories: string[]
}
