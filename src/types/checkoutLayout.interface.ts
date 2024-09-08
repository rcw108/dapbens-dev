import { MoveLine } from './singleTemplates/simpleSingle.interface'

export interface Order {
	icon: string
	text: string
}

export interface CheckoutACF {
	top_bar_icon: string
	top_bar_text: string
	logotype: string
	marquee_line_repeater: MoveLine[]
	rating_image: string
	rating_text: string
	checkout_timer: string
	checkout_after_timer_text: string
	order_advantages: Order[]
	credit_card_image: string[]
}

export interface ICheckoutLayout {
	acf: CheckoutACF
}

export interface ICheckoutShippingValidate {
	products: {
		product_id: number
		quantity: number
		weight: number
	}[]
	destination_zip: string
	destination_country: string
	destination_state: string
}

export interface ICheckoutShippingValidateResponse {
	id: string
	label: string
	cost: string
}

export interface ICheckoutOrder {
	payment_method: string
	payment_method_title: string
	set_paid: false
	billing: {
		first_name: string
		last_name: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
		email: string
		phone?: string
	}
	shipping: {
		first_name: string
		last_name: string
		address_1: string
		address_2: string
		city: string
		state: string
		postcode: string
		country: string
	}
	line_items: {
		product_id: number
		quantity: number
		price: number
	}[]
}

export interface ICreateTransactionRequest {
	createTransactionRequest: {
		merchantAuthentication: {
			name: string
			transactionKey: string
		}
		transactionRequest: {
			transactionType: string
			amount: string
			payment: {
				creditCard: {
					cardNumber: string
					expirationDate: string
					cardCode: string
				}
			}
			lineItems?: {
				lineItem?: {
					itemId?: string
					name?: string
					description?: string
					quantity?: string
					unitPrice?: string
				}[]
			}
			tax?: {
				amount: string
				name: string
				description: string
			}
			duty?: {
				amount: string
				name: string
				description: string
			}
			shipping?: {
				amount: string
				name: string
				description: string
			}
			poNumber?: string
			customer?: {
				id: string
			}
			billTo: {
				firstName: string
				lastName: string
				company?: string
				address: string
				city: string
				state: string
				zip: string
				country: string
			}
			shipTo?: {
				firstName: string
				lastName: string
				company?: string
				address: string
				city: string
				state: string
				zip: string
				country: string
			}
			customerIP?: string
			userFields?: {
				userField: {
					name: string
					value: string
				}[]
			}
		}
	}
}
