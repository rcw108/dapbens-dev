'use client'
import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { CheckoutService } from '@/services/checkout.service'
import {
	ICheckoutOrder,
	ICheckoutShippingValidate,
	ICheckoutShippingValidateResponse
} from '@/types/checkoutLayout.interface'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CartSummary from './cartSummary/CartSummary'
import styles from './CheckoutForms.module.scss'
import { handleCreateOrder } from './orderAction'
import { useCheckoutForm } from './useCheckoutForm'

const CheckoutForms = () => {
	const [selectShipping, setSelectShipping] = useState<string>('')

	const { register, setValue, getValues, watch } = useForm({
		mode: 'onChange'
	})

	const [shipping, setShipping] = useState<
		ICheckoutShippingValidateResponse[] | null
	>(null)
	const [isRequesting, setIsRequesting] = useState(false)

	const { autocompleteRef, isLoaded } = useCheckoutForm(setValue)

	const { itemListCount } = useCart()
	const { products } = useProducts()

	const watchedFields = watch(['stateCountry', 'zipCode', 'cityTown'])

	const totalPrice = itemListCount.reduce((acc, item) => {
		return acc + +item.price * +item.count
	}, 0)

	useEffect(() => {
		if (totalPrice > 50) {
			setSelectShipping('Free shipping')
		}
	}, [totalPrice])

	const prevValuesRef = useRef({
		stateCountry: '',
		zipCode: '',
		cityTown: ''
	})

	useEffect(() => {
		if (!isLoaded || isRequesting) return

		const stateCountry = getValues('stateCountry')
		const zipCode = getValues('zipCode')
		const cityTown = getValues('cityTown')

		if (stateCountry === '' || zipCode === '' || cityTown === '') {
			return
		}

		const prevValues = prevValuesRef.current

		if (
			stateCountry === prevValues.stateCountry &&
			zipCode === prevValues.zipCode &&
			cityTown === prevValues.cityTown
		) {
			return
		}

		prevValuesRef.current = {
			stateCountry,
			zipCode,
			cityTown
		}

		setIsRequesting(true)

		const shippingRequest: ICheckoutShippingValidate = {
			destination_country: 'US',
			destination_state: stateCountry,
			destination_zip: zipCode,
			products: itemListCount.map(item => {
				const product = products?.find(p => p.id === item.id)
				const weight = product ? Number(product.weight) : 0.12

				return {
					product_id: +item.id,
					quantity: +item.count || 0,
					weight: weight
				}
			})
		}

		const fetch = async () => {
			try {
				const response =
					await CheckoutService.validateShippingCost(shippingRequest)
				const responseData = response.data
				if (responseData !== null) {
					setShipping(responseData)
				}
			} catch (e) {
				console.log(e)
			} finally {
				setIsRequesting(false)
			}
		}

		fetch()
	}, [watchedFields, isLoaded, isRequesting])

	const productsToRender = products?.filter(product =>
		itemListCount.some(item => item.id === product.id)
	)

	const validateBtn = (): boolean => {
		const firstName = getValues('firstName')
		const lastName = getValues('lastName')
		const cityTown = getValues('cityTown')
		const stateCountry = getValues('stateCountry')
		const zipCode = getValues('zipCode')
		const email = getValues('email')

		if (
			firstName &&
			lastName &&
			cityTown &&
			stateCountry &&
			zipCode &&
			email &&
			autocompleteRef.current &&
			autocompleteRef.current.value
		) {
			return true
		}
		return false
	}

	const convertExpirationDate = (expDate: string): string => {
		// Убедитесь, что входная строка имеет длину 6 и состоит из цифр
		if (expDate.length !== 6 || !/^\d{6}$/.test(expDate)) {
			throw new Error('Invalid expiration date format')
		}

		const month = expDate.slice(0, 2)
		const year = `20${expDate.slice(2, 4)}`

		// Проверка на валидность месяца и года
		if (Number(month) < 1 || Number(month) > 12) {
			throw new Error('Invalid month')
		}

		return `${year}-${month}`
	}

	const handleBtn = async () => {
		if (!validateBtn()) return

		const cardExpDate = getValues('cardExpDate')

		const formattedExpirationDate =
			cardExpDate && cardExpDate.length === 6
				? convertExpirationDate(cardExpDate)
				: ''

		const orderData: ICheckoutOrder = {
			payment_method: 'credit card',
			payment_method_title: 'Bank Transfer',
			set_paid: false,
			billing: {
				first_name: getValues('firstName'),
				last_name: getValues('lastName'),
				address_1: autocompleteRef.current ? autocompleteRef.current.value : '',
				address_2: '',
				city: getValues('cityTown'),
				state: getValues('stateCountry'),
				postcode: getValues('zipCode'),
				country: 'US',
				email: getValues('email'),
				phone: getValues('phone') || ''
			},
			shipping: {
				first_name: getValues('firstName'),
				last_name: getValues('lastName'),
				address_1: autocompleteRef.current ? autocompleteRef.current.value : '',
				address_2: '',
				city: getValues('cityTown'),
				state: getValues('stateCountry'),
				postcode: getValues('zipCode'),
				country: 'US'
			},
			line_items: itemListCount.map(item => ({
				product_id: +item.id,
				quantity: +item.count,
				price: +item.price
			}))
		}

		const cardData = {
			creditCard: {
				cardNumber: getValues('cardNumber'),
				expirationDate: getValues('expiry'),
				cardCode: getValues('cardCode'),
				total: totalPrice
			}
		}

		const shippingData = {
			shipping:
				selectShipping === 'Free shipping'
					? { id: 'free', label: 'Free shipping', cost: '0.00' }
					: shipping?.find(item => item.label === selectShipping) || {
							label: '',
							cost: '0.00'
						}
		}

		try {
			const order = await handleCreateOrder(orderData, cardData, shippingData)
			console.log('Order response:', order)
		} catch (error) {
			console.error('Ошибка при создании ордера:', error)
		}
	}

	if (!isLoaded) return <div>Loading...</div>

	return (
		<div className={styles.wrap}>
			<div className={styles.left}>
				<SmallHeading className='mb-5' title={'Billing details'} />
				<form className={styles.billing}>
					<label>
						<Description title={'First name'} />
						<input type='text' {...register('firstName')} />
					</label>
					<label>
						<Description title={'Last name'} />
						<input type='text' {...register('lastName')} />
					</label>
					<label className={styles.company}>
						<Description title={'Company name (optional)'} />
						<input type='text' {...register('companyName')} />
					</label>
					<label>
						<Description title={'Country / Region'} />
						<Description title={'United States (US)'} />
					</label>
					<label>
						<Description title={'State / County'} />
						<input type='text' {...register('stateCountry')} />
					</label>
					<label className={styles.street}>
						<Description title={'Street address'} />
						<input
							type='text'
							ref={autocompleteRef}
							placeholder='Enter your address'
						/>
					</label>
					<label>
						<Description title={'City / Town'} />
						<input type='text' {...register('cityTown')} />
					</label>
					<label>
						<Description title={'Zip code'} />
						<input type='text' {...register('zipCode')} />
					</label>
					<label>
						<Description title={'Email address'} />
						<input type='email' {...register('email')} />
					</label>
					<label>
						<Description title={'Phone number (optional)'} />
						<input type='tel' {...register('phone')} />
					</label>
				</form>
				<div className={styles.checkouts}></div>
				<div className={styles.shipping}>
					<SmallHeading className={styles.shipText} title={'Shipping'} />
					<div className={styles.boxes}>
						{itemListCount &&
							itemListCount.reduce((acc, item) => acc + +item.price, 0) >
								50 && (
								<div
									onClick={() => setSelectShipping('Free shipping')}
									className={clsx(styles.box, {
										[styles.select]: selectShipping === 'Free shipping'
									})}
								>
									<div className={styles.itemShip}>
										<div
											className={clsx(styles.checkbox, {
												[styles.selectCheck]: selectShipping === 'Free shipping'
											})}
										></div>
										<p className='text-black'>Free shipping</p>
									</div>
								</div>
							)}
						{shipping &&
							shipping
								.sort((a, b) => +a.cost - +b.cost)
								.map((item, index) => (
									<div
										className={clsx(styles.box, {
											[styles.select]: selectShipping === item.label
										})}
										onClick={() => setSelectShipping(item.label)}
										key={item.id}
									>
										<div className={styles.itemShip}>
											<div
												className={clsx(styles.checkbox, {
													[styles.selectCheck]: selectShipping === item.label
												})}
											></div>
											<p className='text-black'>{item.label}</p>
										</div>
										<p className='text-black'>${item.cost}</p>
									</div>
								))}
					</div>
				</div>
				<div className={styles.payment}>
					<SmallHeading className={styles.payText} title={'Payment details'} />
					<div className={styles.paymentBox}>
						<div className={styles.paymentTop}>
							<h3>
								<div className={styles.checked}></div>
								Credit Card
							</h3>
							<Description title='Pay securely using your credit card.' />
							<div className={styles.cards}></div>
						</div>
						<div className={styles.paymentForm}>
							<form className={styles.pay}>
								<label className={styles.card}>
									<Description title={'Card Number'} />
									<input
										type='tel'
										{...register('cardNumber')}
										placeholder='•••• •••• •••• ••••'
									/>
								</label>
								<label>
									<Description title={'Expiry (MM/YY)'} />
									<input
										type='tel'
										{...register('expiry')}
										placeholder='MM / YY'
									/>
								</label>
								<label>
									<Description title='Card code' />
									<input
										type='tel'
										{...register('cardCode')}
										placeholder='CVC'
										maxLength={4}
									/>
								</label>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<CartSummary />
				<div className={styles.subtotal}>
					<SmallHeading className={styles.subTotalTitle} title={'Subtotal'} />
					<div className={styles.subPrice}>
						<p className={styles.bdi}>
							$
							{productsToRender &&
								productsToRender.reduce(
									(acc, item) => acc + +item.regular_price,
									0
								)}
						</p>
						<p className={styles.ins}>
							$
							{itemListCount &&
								itemListCount.reduce((acc, item) => acc + +item.price, 0)}
						</p>
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.total}>
					<SmallHeading className={styles.totalTitle} title={'Total'} />
					<div className={styles.totalPrice}>
						<p className={styles.bdi}>
							$
							{productsToRender &&
								productsToRender.reduce(
									(acc, item) => acc + +item.regular_price,
									0
								) +
									(shipping &&
									shipping.find(item => item.label === selectShipping)?.cost
										? Number(
												shipping.find(item => item.label === selectShipping)
													?.cost
											) || 0
										: 0)}
						</p>
						<p className={styles.ins}>
							$
							{itemListCount &&
								itemListCount.reduce((acc, item) => acc + +item.price, 0) +
									(shipping &&
									shipping.find(item => item.label === selectShipping)?.cost
										? Number(
												shipping.find(item => item.label === selectShipping)
													?.cost
											) || 0
										: 0)}
						</p>
						<div className={styles.save}>
							{`You're saved $${
								productsToRender &&
								productsToRender
									.reduce((acc, item) => {
										const regularPrice = Number(item.regular_price) || 0
										const price = Number(item.price) || 0
										return acc + (regularPrice - price)
									}, 0)
									.toFixed(2)
							}`}
						</div>
					</div>
				</div>
				<div className={styles.btns}>
					<button
						className={styles.btn}
						disabled={!validateBtn()}
						onClick={handleBtn}
					>
						PLACE ORDER
					</button>
				</div>
			</div>
		</div>
	)
}

export default CheckoutForms
