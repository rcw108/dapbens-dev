'use server'

import { API_URL } from '@/configs/api.config'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
import axios from 'axios'
import { AuthCustomer, RegistrationCustomer } from './customer.interface'

const customerURL = `${API_URL}/wp-json/wc/v3/customers`
const authRoute = `${API_URL}/woo/?rest_route=/auth/v1`

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
	consumerKey: process.env.WOO_USER_KEY || '',
	consumerSecret: process.env.WOO_USER_API_KEY || '',
	version: 'wc/v3'
})

export const createCustomer = async (data: RegistrationCustomer) => {
	try {
		const response = await api.post('customers', data)
		return { success: true, data: response.data }
	} catch (error: any) {
		if (error.response && error.response.data) {
			// WooCommerce API error
			return {
				success: false,
				error: {
					code: error.response.data.code,
					message: error.response.data.message
				}
			}
		} else {
			// Network or other error
			return {
				success: false,
				error: {
					code: 'unknown-error',
					message: 'An unexpected error occurred. Please try again.'
				}
			}
		}
	}
}

export const authCustomer = async (data: AuthCustomer) => {
	const reqBody: Partial<RegistrationCustomer> = {
		password: data.password
	}
	let path = `${authRoute}/auth&`
	if (data.login.includes('@')) {
		reqBody['email'] = data.login
		path = `${path}email`
	} else {
		reqBody['username'] = data.login
		path = `${path}username`
	}

	const response = await axios
		.post(`${path}=${data.login}&password=${data.password}`, reqBody)
		.then(res => res.data)

	return response
}

export const validateToken = async (token: string) => {
	const response = await axios
		.get(`${authRoute}/auth/validate&JWT=${token}`)
		.then(res => res.data.data)

	return response
}
