'use server'

import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
import { cache } from 'react'

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
	consumerKey: process.env.WOO_USER_KEY || '',
	consumerSecret: process.env.WOO_USER_API_KEY || '',
	version: 'wc/v3'
})

export const getAllProducts = cache(async (per_page: number = 100) => {
	const response: { data: WooCommerceSingleProduct[] } = await api.get(
		'products',
		{
			per_page
		}
	)

	return {
		products: response.data
	}
})

export const getSingleProductBySlug = cache(async (slug: string = '') => {
	const response = await api.get('products', {
		slug: slug
	})
	return response.data[0]
})
