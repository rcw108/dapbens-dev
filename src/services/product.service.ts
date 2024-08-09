const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default
import { cache } from 'react'

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_BACKEND_API_URL,
	consumerKey: 'ck_2de16704e1ebc2a83ac7925951567c6d0b0979a3',
	consumerSecret: 'cs_24b5cddddf93b8334df0bf62baebb65dc78b7146',
	version: 'wc/v3'
})

export const getAllProducts = cache(async (per_page: number = 50) => {
	return await api.get('products', {
		per_page
	})
})

export const ProductService = {
	// async getAllProducts(per_page: number = 50) {
	// 	return await api.get('products', {
	// 		per_page
	// 	})
	// },

	async getSingleProductBySlug(slug: string = '') {
		return await api.get('products', {
			slug: slug
		})
	}
}
