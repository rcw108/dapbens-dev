import { axiosClassic } from '@/api/interceptor'
import { productUrl } from '@/configs/product.config'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export const ProductService = {
	async getAllProducts() {
		return axiosClassic.get<WooCommerceSingleProduct[]>(productUrl)
	},

	async getSingleProduct(id: number) {
		return axiosClassic.get<WooCommerceSingleProduct>(`${productUrl}/${id}`)
	}
}
