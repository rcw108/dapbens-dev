'use server'

import {
	createOrder,
	getDiscountCodeAsync,
	updateOrderPaymentStatus
} from '@/components/ui/home/products/productActions'
import {
	AuthNetCreateSubscribe,
	AuthSubRequestData,
	ICheckoutOrder,
	ICreateTransactionRequest
} from '@/types/checkoutLayout.interface'
import axios from 'axios'

const sendTransactionRequest = async (
	transactionData: ICreateTransactionRequest
) => {
	try {
		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
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
				lineItems: {
					lineItem: orderData.line_items.map(item => ({
						itemId: String(item.product_id),
						name: String(item.product_id),
						quantity: String(item.quantity),
						unitPrice: String(item.price)
					}))
				},
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
		console.log(123123123, order)
		console.log('Order created successfully:', order)
		try {
			const transactionResponse = await sendTransactionRequest(transactionData)
			console.log(222222222222222, transactionResponse.messages)
			if (transactionResponse.transactionResponse.responseCode === '2') {
				const res = await updateOrderPaymentStatus(order.id, 'failed')
				console.log(res)
			}
			if (transactionResponse.transactionResponse.responseCode === '1') {
				const res = await updateOrderPaymentStatus(order.id, 'processing')
				console.log(res)
			}
			if (transactionResponse.transactionResponse.responseCode === '4') {
				const res = await updateOrderPaymentStatus(order.id, 'processing')
				console.log(res)
			}
			if (transactionResponse.transactionResponse.responseCode === '3') {
				const res = await updateOrderPaymentStatus(order.id, 'failed')
				console.log(res)
			}
			return { order, transactionResponse }
		} catch (error) {
			console.log('Error sending transaction response:', error)
		}
	} catch (error) {
		console.error('Error creating order:', error)
		throw new Error('Order creation failed')
	}
}

export const getDiscountCode = async (discountName: string) => {
	const res = await getDiscountCodeAsync(discountName)
	return res
}

export const createSubscribeAuthNet = async (data: AuthSubRequestData) => {
	try {
		const requestData: AuthNetCreateSubscribe = {
			ARBCreateSubscriptionRequest: {
				merchantAuthentication: {
					name: process.env.AUTH_NET_NAME || '',
					transactionKey: process.env.AUTH_NET_KEY || ''
				},
				subscription: {
					name: 'Sample subscription',
					paymentSchedule: {
						interval: {
							length: data.interval,
							unit: data.unit
						},
						startDate: data.startDate,
						totalOccurrences: '9999'
					},
					amount: data.amount,
					payment: {
						creditCard: {
							cardNumber: data.cardNumber,
							expirationDate: data.expirationDate
						}
					},
					billTo: {
						firstName: data.firstName,
						lastName: data.lastName
					}
				}
			}
		}

		const response = await axios.post(
			'https://api2.authorize.net/xml/v1/request.api',
			requestData,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		return response.data
	} catch (error) {
		console.error('Error creating subscribe:', error)
	}
}
