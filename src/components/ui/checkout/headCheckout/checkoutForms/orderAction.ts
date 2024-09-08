'use server'

import { createOrder } from '@/components/ui/home/products/productActions'
import {
	ICheckoutOrder,
	ICreateTransactionRequest
} from '@/types/checkoutLayout.interface'
import axios from 'axios'

const sendTransactionRequest = async (
	transactionData: ICreateTransactionRequest
) => {
	try {
		const response = await axios.post(
			'https://apitest.authorize.net/xml/v1/request.api',
			transactionData,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		return response.data
	} catch (error) {
		console.error('Error sending transaction request:', error)
		throw new Error('Transaction request failed')
	}
}

// Функция создания ордера
export const handleCreateOrder = async (
	orderData: ICheckoutOrder,
	cardData: {
		creditCard: {
			cardNumber: string
			expirationDate: string
			cardCode: string
			total: number
		}
	},
	shippingData: {
		shipping: {
			label: string
			cost: string
		}
	}
) => {
	const transactionData: ICreateTransactionRequest = {
		createTransactionRequest: {
			merchantAuthentication: {
				name: process.env.AUTH_NET_NAME || '',
				transactionKey: process.env.AUTH_NET_KEY || ''
			},
			transactionRequest: {
				transactionType: 'authCaptureTransaction',
				amount: String(cardData.creditCard.total), // Сумма заказа
				payment: {
					creditCard: {
						cardNumber: cardData.creditCard.cardNumber, // Данные можно получать из формы оплаты
						expirationDate: cardData.creditCard.expirationDate,
						cardCode: cardData.creditCard.cardCode
					}
				},
				// lineItems: {
				// 	lineItem: orderData.line_items.map(item => ({
				// 		itemId: String(item.product_id),
				// 		name: String(item.product_id),
				// 		quantity: String(item.quantity),
				// 		unitPrice: String(item.price)
				// 	}))
				// },
				shipping: {
					amount: shippingData.shipping.cost,
					name: shippingData.shipping.label,
					description: shippingData.shipping.label
				},
				billTo: {
					firstName: orderData.billing.first_name,
					lastName: orderData.billing.last_name,
					company: orderData.billing.address_2,
					address: orderData.billing.address_1,
					city: orderData.billing.city,
					state: orderData.billing.state,
					zip: orderData.billing.postcode,
					country: orderData.billing.country
				},
				shipTo: {
					firstName: orderData.shipping.first_name,
					lastName: orderData.shipping.last_name,
					company: orderData.shipping.address_2,
					address: orderData.shipping.address_1,
					city: orderData.shipping.city,
					state: orderData.shipping.state,
					zip: orderData.shipping.postcode,
					country: orderData.shipping.country
				}
			}
		}
	}

	try {
		const order = await createOrder(orderData)
		console.log('Order created successfully:', order)
		const transactionResponse = await sendTransactionRequest(transactionData)
		console.log('Transaction response:', transactionResponse)

		return { order, transactionResponse }
	} catch (error) {
		console.error('Error creating order:', error)
		throw new Error('Order creation failed')
	}
}
