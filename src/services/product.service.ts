import { axiosClassic } from '@/api/interceptor'
import { productUrl } from '@/configs/product.config'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export const ProductService = {
	async getAllProducts() {
		return axiosClassic.get<WooCommerceSingleProduct[]>(
			`${productUrl}?per_page=60`
		)
	},

	async getSingleProduct(id: number) {
		return axiosClassic.get<WooCommerceSingleProduct>(`${productUrl}/${id}`)
	}
}
