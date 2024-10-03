'use server'

import { SingleCustomer } from '@/components/ui/myAccount/customer.interface'
import { SetCustomerAuthorizeMetaData } from '@/components/ui/myAccount/customersActions'
import { ItemListCount } from '@/store/cart/cart.interface'
import { IUser } from '@/store/user/user.interface'
import {
	AuthSubRequestData,
	ICheckoutOrder,
	SubscribeCreate
} from '@/types/checkoutLayout.interface'
import { handleCreateOrder } from './orderAction'

export interface CardData {
	creditCard: {
		cardNumber: string
		expirationDate: string
		cardCode: string
		total: number
	}
}

export interface ShippingData {
	shipping: {
		label: string
		cost: string
	}
}

export interface IAuthorize {
	key: string
	id: number
	value: string
}

export const handleCheckout = async (
	orderData: ICheckoutOrder,
	cardData: CardData,
	shippingData: ShippingData,
	haveSubscribeItems: ItemListCount[],
	user: IUser | null,
	subscribeData: SubscribeCreate,
	authorize: IAuthorize | null | undefined,
	customer: SingleCustomer | null,
	requestData: AuthSubRequestData,
	requestSaveMetaDataBody: SetCustomerAuthorizeMetaData
) => {
	try {
		const order = await handleCreateOrder(orderData, cardData, shippingData)
		console.log('order', order)

		return {
			success: true,
			order
		}

		// if (
		// 	order &&
		// 	order.transactionResponse.transactionResponse &&
		// 	!order.transactionResponse.transactionResponse.errors
		// ) {
		// 	if (haveSubscribeItems.length > 0 && user) {
		// 		subscribeData.customer_id = Number(user.ID)
		// 		try {
		// 			const resCreateWoOrderSubscribe =
		// 				await createCustomerSubscribeOrderWo(subscribeData)
		// 			console.log('resCreateWoOrderSubscribe', resCreateWoOrderSubscribe)
		// 			if (
		// 				!authorize ||
		// 				!customer?.meta_data?.find(
		// 					meta => meta.key === '_authnet_customer_id'
		// 				)
		// 			) {
		// 				try {
		// 					const responseAuthNetSubscribeAndProfileRequest =
		// 						await createSubscribeAuthNet(requestData)
		// 					console.log(
		// 						'responseAuthNetSubscribeAndProfileRequest',
		// 						responseAuthNetSubscribeAndProfileRequest.messages.message
		// 					)
		// 					if (
		// 						responseAuthNetSubscribeAndProfileRequest.messages
		// 							.resultCode === 'Ok'
		// 					) {
		// 						try {
		// 							requestSaveMetaDataBody.metadata.value =
		// 								responseAuthNetSubscribeAndProfileRequest.paymentProfile.customerProfileId

		// 							const saveCustomerAuthNetToken =
		// 								await setCustomerAuthorizeMetaData(
		// 									requestSaveMetaDataBody,
		// 									Number(user.ID)
		// 								)
		// 							console.log(
		// 								'saveCustomerAuthNetToken',
		// 								saveCustomerAuthNetToken
		// 							)
		// 							if (saveCustomerAuthNetToken.success) {
		// 								try {
		// 									console.log(resCreateWoOrderSubscribe)
		// 									const responseUpdateSubscribeWo =
		// 										await updateSubscribePaymentStatus(
		// 											resCreateWoOrderSubscribe.id,
		// 											'active'
		// 										)
		// 									console.log(
		// 										'responseUpdateSubscribeWo',
		// 										responseUpdateSubscribeWo
		// 									)
		// 									return {
		// 										success: true,
		// 										responseUpdateSubscribeWo,
		// 										saveCustomerAuthNetToken,
		// 										responseAuthNetSubscribeAndProfileRequest,
		// 										resCreateWoOrderSubscribe,
		// 										order
		// 									}
		// 								} catch (error) {
		// 									console.error('updateSubscribePaymentStatus', error)
		// 									return {
		// 										success: false,
		// 										error: 'Error Update Subscribe Payment Status'
		// 									}
		// 								}
		// 							} else {
		// 								return {
		// 									success: false,
		// 									error: 'Failed to save customer AuthNet token'
		// 								}
		// 							}
		// 						} catch (error) {
		// 							console.error('setCustomerAuthorizeMetaData', error)
		// 							return {
		// 								success: false,
		// 								error: 'Error Set Customer Meta Data'
		// 							}
		// 						}
		// 					} else {
		// 						return {
		// 							success: false,
		// 							error: 'AuthNet Subscribe and Profile Request failed'
		// 						}
		// 					}
		// 				} catch (error) {
		// 					console.error('createSubscribeAuthNet', error)
		// 					return {
		// 						success: false,
		// 						error: 'Error Create customer subscribe authorize'
		// 					}
		// 				}
		// 			} else {
		// 				return {
		// 					success: true,
		// 					message: 'Subscription created without new AuthNet profile',
		// 					resCreateWoOrderSubscribe,
		// 					order
		// 				}
		// 			}
		// 		} catch (error) {
		// 			console.error('createCustomerSubscribeOrderWo', error)
		// 			return {
		// 				success: false,
		// 				error: 'Error Create customer subscribe order'
		// 			}
		// 		}
		// 	} else {
		// 		return {
		// 			success: true,
		// 			message: 'Order created without subscription',
		// 			order
		// 		}
		// 	}
		// } else {
		// 	return {
		// 		success: false,
		// 		error:
		// 			order?.transactionResponse.transactionResponse.errors ||
		// 			'Transaction error'
		// 	}
		// }
	} catch (error) {
		console.error('handleCreateOrder', error)
		return {
			success: false,
			error: 'Unhandled error in handleCheckout'
		}
	}
}
