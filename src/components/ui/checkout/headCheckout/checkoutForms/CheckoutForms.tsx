'use client'
import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { CheckoutService } from '@/services/checkout.service'
import {
	Discount,
	ICheckoutOrder,
	ICheckoutShippingValidate,
	ICheckoutShippingValidateResponse,
	Order
} from '@/types/checkoutLayout.interface'
import clsx from 'clsx'
import creditCardType from 'credit-card-type'
import { CreditCardType } from 'credit-card-type/dist/types'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactHtmlParser from 'react-html-parser'
import Select from 'react-select'
import CartSummary from './cartSummary/CartSummary'
import styles from './CheckoutForms.module.scss'
import { getDiscountCode, handleCreateOrder } from './orderAction'
import { states } from './statesData'
import { useCheckoutForm } from './useCheckoutForm'
import { useCheckoutFormDiff } from './useCheckoutFormDiff'

interface AddressValues {
	stateCountry: string
	zipCode: string
	cityTown: string
	stateCountryDiff: string
	zipCodeDiff: string
	cityTownDiff: string
}

const CheckoutForms: FC<{
	credit_card_image: { card_image: string }[]
	order_advantages: Order[]
}> = ({ credit_card_image, order_advantages }) => {
	const [account, setAccount] = useState(false)
	const [news, setNews] = useState(false)
	const [diffAddress, setDiffAddress] = useState(false)

	const [selectShipping, setSelectShipping] = useState<string>('')

	const { register, setValue, getValues, watch, control } = useForm({
		mode: 'onChange'
	})

	const [shipping, setShipping] = useState<
		ICheckoutShippingValidateResponse[] | null
	>(null)
	const [isRequesting, setIsRequesting] = useState(false)

	const [discountValue, setDiscountValue] = useState<Discount | null | string>(
		null
	)

	const [cardType, setCardType] = useState<CreditCardType[] | null>(null)
	const [cardImage, setCardImage] = useState<string>('')

	const { autocompleteRef, isLoaded } = useCheckoutForm(setValue)
	const { autocompleteRefDiff, isLoadedDiff } = useCheckoutFormDiff(setValue)

	const { itemListCount } = useCart()
	const { products } = useProducts()

	const watchedFields = watch([
		'stateCountry',
		'zipCode',
		'cityTown, zipCodeDiff, cityTownDiff, stateCountryDiff'
	])

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
		cityTown: '',
		stateCountryDiff: '',
		zipCodeDiff: '',
		cityTownDiff: ''
	})

	useEffect(() => {
		if (!isLoaded || isRequesting) return

		const currentValues: AddressValues = {
			stateCountry: getValues('stateCountry'),
			zipCode: getValues('zipCode'),
			cityTown: getValues('cityTown'),
			stateCountryDiff: getValues('stateCountryDiff'),
			zipCodeDiff: getValues('zipCodeDiff'),
			cityTownDiff: getValues('cityTownDiff')
		}

		const prevValues = prevValuesRef.current

		const hasChanged = (
			Object.keys(currentValues) as Array<keyof AddressValues>
		).some(key => currentValues[key] !== prevValues[key])

		if (!hasChanged) return

		prevValuesRef.current = { ...currentValues }

		setIsRequesting(true)

		const createShippingRequest = (
			state: string,
			zip: string
		): ICheckoutShippingValidate => ({
			destination_country: 'US',
			destination_state: state,
			destination_zip: zip,
			products: itemListCount.map(item => {
				const product = products?.find(p => p.id === item.id)
				const weight = product ? Number(product.weight) : 0.12

				return {
					product_id: +item.id,
					quantity: +item.count || 0,
					weight: weight
				}
			})
		})

		const shippingRequest = diffAddress
			? createShippingRequest(
					currentValues.stateCountryDiff,
					currentValues.zipCodeDiff
				)
			: createShippingRequest(currentValues.stateCountry, currentValues.zipCode)

		const fetchShippingCost = async () => {
			try {
				const response =
					await CheckoutService.validateShippingCost(shippingRequest)
				const responseData = response.data
				if (responseData !== null) {
					setShipping(responseData)
				}
			} catch (e) {
				console.error('Error fetching shipping cost:', e)
			} finally {
				setIsRequesting(false)
			}
		}

		fetchShippingCost()
	}, [
		watchedFields,
		isLoaded,
		isRequesting,
		diffAddress,
		itemListCount,
		products
	])

	const productsToRender = products?.filter(product =>
		itemListCount.some(item => item.id === product.id)
	)

	const [auth, setAuth] = useState(false)

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

	const handleDiscount = async () => {
		const discountCode = getValues('discountCode')
		if (!discountCode) return

		const res: Discount[] = await getDiscountCode(discountCode)

		if (res === null) {
			setDiscountValue('Coupon not valid')
		}

		if (typeof res === 'string') {
			setDiscountValue('Coupon not valid')
		}

		setDiscountValue(res[0])
	}

	const resetDiscount = () => {
		setDiscountValue(null)
		setValue('discountCode', '')
	}

	const handleBtn = async () => {
		if (!validateBtn()) return

		const haveSubscribeItems = itemListCount.filter(
			item => item.paymentType === 'subscription'
		)

		// if (haveSubscribeItems.length > 0 && auth) {
		// 	const response = await createSubscribeAuthNet()
		// }

		const cardExpDate = getValues('cardExpDate')

		const formattedExpirationDate =
			cardExpDate && cardExpDate.length === 6
				? convertExpirationDate(cardExpDate)
				: ''

		const orderData: ICheckoutOrder = {
			payment_method: 'credit card',
			payment_method_title: 'Bank Transfer',
			set_paid: false,
			coupon_lines: {
				code: getValues('discountCode')
			},
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
				first_name:
					getValues('firstNameDiff') === ''
						? getValues('firstName')
						: getValues('firstNameDiff'),
				last_name:
					getValues('lastNameDiff') === ''
						? getValues('lastName')
						: getValues('lastNameDiff'),
				address_1: autocompleteRefDiff.current
					? autocompleteRefDiff.current.value
					: autocompleteRef.current
						? autocompleteRef.current.value
						: '',
				address_2: '',
				city:
					getValues('cityTownDiff') === ''
						? getValues('cityTown')
						: getValues('cityTownDiff'),
				state:
					getValues('stateCountryDiff') === ''
						? getValues('stateCountry')
						: getValues('stateCountryDiff'),
				postcode:
					getValues('zipCodeDiff') === ''
						? getValues('zipCode')
						: getValues('zipCodeDiff'),
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
				total: +discountTotal()
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

	const discountTotal = () => {
		// Вычисляем общую стоимость товаров
		const totalItemPrice = itemListCount.reduce(
			(acc, item) => acc + +item.price * +item.count,
			0
		)

		// Находим стоимость выбранной доставки, если таковая имеется
		const shippingCost =
			shipping?.find(item => item.label === selectShipping)?.cost ?? 0

		// Вычисляем общую стоимость с учетом доставки
		const totalBeforeDiscount = totalItemPrice + Number(shippingCost)

		// Вычисляем скидку, если она есть
		const discountAmount =
			typeof discountValue === 'object' && typeof discountValue !== null
				? discountValue?.amount
					? +discountValue.amount / 100
					: 0
				: 0

		// Применяем скидку
		const totalAfterDiscount = totalBeforeDiscount * (1 - discountAmount)

		// Форматируем итоговую сумму до двух знаков после запятой
		return totalAfterDiscount.toFixed(2)
	}

	const watchCard = watch('cardNumber')

	const cardTypeCheck = () => {
		const cardNumber = getValues('cardNumber')
		const cardChecked = creditCardType(cardNumber)
		setCardType(cardChecked)
	}

	useEffect(() => {
		cardTypeCheck()
	}, [watchCard])

	console.log(cardType, credit_card_image)

	if (!isLoaded) return <div>Loading...</div>

	return (
		<div className={styles.wrap}>
			<div className={styles.left}>
				<SmallHeading className='mb-5' title={'Billing details'} />
				<form className={styles.billing}>
					<label className={styles.req}>
						<Description title={'First name'} />
						<input type='text' required {...register('firstName')} />
					</label>
					<label className={styles.req}>
						<Description title={'Last name'} />
						<input type='text' required {...register('lastName')} />
					</label>
					<label className={styles.company}>
						<Description title={'Company name (optional)'} />
						<input type='text' {...register('companyName')} />
					</label>
					<label className={styles.req}>
						<Description title={'Country / Region'} />
						<Description
							className={styles.countryBlock}
							title={'United States (US)'}
						/>
					</label>
					<label className={styles.req}>
						<Description title={'State / County'} />
						<Controller
							name='stateCountry'
							control={control}
							defaultValue=''
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									{...field}
									options={states}
									required
									placeholder='Select a state'
									className={styles.select}
									classNamePrefix='select'
									onChange={selectedOption =>
										field.onChange(selectedOption ? selectedOption.value : '')
									}
									value={states.find(option => option.label === field.value)}
								/>
							)}
						/>
					</label>
					<label className={clsx(styles.street, styles.req)}>
						<Description title={'Street address'} />
						<input
							required
							type='text'
							ref={autocompleteRef}
							placeholder='House number and street name'
						/>
					</label>
					<label className={styles.req}>
						<Description title={'City / Town'} />
						<input required type='text' {...register('cityTown')} />
					</label>
					<label className={styles.req}>
						<Description title={'Zip code'} />
						<input required type='text' {...register('zipCode')} />
					</label>
					<label className={styles.req}>
						<Description title={'Email address'} />
						<input required type='email' {...register('email')} />
					</label>
					<label>
						<Description title={'Phone number (optional)'} />
						<input type='tel' {...register('phone')} />
					</label>
				</form>
				<div className={styles.checkouts}>
					<h3 className={styles.h3} onClick={() => setNews(!news)}>
						<div
							className={clsx(styles.check, {
								[styles.checked]: news === true
							})}
						></div>
						Sign me up to receive email updates and news (optional)
					</h3>
					<h3 className={styles.h3} onClick={() => setAccount(!account)}>
						<div
							className={clsx(styles.check, {
								[styles.checked]: account === true
							})}
						></div>
						Create an account?
					</h3>
					<h3
						className={styles.h3}
						onClick={() => setDiffAddress(!diffAddress)}
					>
						<div
							className={clsx(styles.check, {
								[styles.checked]: diffAddress === true
							})}
						></div>
						Ship to a different address?
					</h3>
				</div>
				<div className={clsx(styles.shipDiff, { [styles.show]: diffAddress })}>
					<form className={styles.billing}>
						<label className={styles.req}>
							<Description title={'First name'} />
							<input
								required={diffAddress}
								type='text'
								{...register('firstNameDiff')}
							/>
						</label>
						<label className={styles.req}>
							<Description title={'Last name'} />
							<input
								required={diffAddress}
								type='text'
								{...register('lastNameDiff')}
							/>
						</label>
						<label className={styles.company}>
							<Description title={'Company name (optional)'} />
							<input
								required={diffAddress}
								type='text'
								{...register('companyNameDiff')}
							/>
						</label>
						<label className={styles.req}>
							<Description title={'Country / Region'} />
							<Description
								className={styles.countryBlock}
								title={'United States (US)'}
							/>
						</label>
						<label className={styles.req}>
							<Description title={'State / County'} />
							<Controller
								name='stateCountryDiff'
								control={control}
								defaultValue=''
								rules={{ required: true }}
								render={({ field }) => (
									<Select
										{...field}
										required={diffAddress}
										options={states}
										placeholder='Select a state'
										className={styles.select}
										classNamePrefix='select'
										onChange={selectedOption =>
											field.onChange(selectedOption ? selectedOption.value : '')
										}
										value={states.find(option => option.label === field.value)}
									/>
								)}
							/>
						</label>
						<label className={clsx(styles.street, styles.req)}>
							<Description title={'Street address'} />
							<input
								required={diffAddress}
								type='text'
								ref={autocompleteRefDiff} // Используйте autocompleteRefDiff здесь
								placeholder='House number and street name'
							/>
						</label>
						<label className={styles.req}>
							<Description title={'City / Town'} />
							<input type='text' {...register('cityTownDiff')} />
						</label>
						<label className={styles.req}>
							<Description title={'Zip code'} />
							<input
								required={diffAddress}
								type='text'
								{...register('zipCodeDiff')}
							/>
						</label>
					</form>
				</div>
				<div
					className={clsx(styles.shipping, {
						[styles.none]: shipping === null
					})}
				>
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
							<h3 className={styles.h3}>
								<div className={styles.checked}></div>
								Credit Card
							</h3>
							<Description title='Pay securely using your credit card.' />
							<div className={styles.cards}>
								{credit_card_image &&
									credit_card_image.map((card, index) => (
										<Image
											key={`${card}-${index}`}
											src={card.card_image}
											alt='credit card'
											width={30}
											height={30}
										/>
									))}
							</div>
						</div>
						<div className={styles.paymentForm}>
							<form className={styles.pay}>
								<label className={styles.card}>
									<div className={styles.cardType}>
										{cardType &&
											cardType[0] &&
											getValues('cardNumber') !== '' && (
												<Image src={`/${cardType[0].type}.svg`} alt='' fill />
											)}
									</div>
									<Description title={'Card Number'} />
									<input
										type='tel'
										{...register('cardNumber')}
										placeholder='•••• •••• •••• ••••'
										maxLength={19}
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
				<div className={styles.discount}>
					<SmallHeading
						className={styles.titleDisc}
						title={'Enter your discount code'}
					/>
					<label>
						<input type='text' {...register('discountCode')} />
						<span className={styles.couponError}>
							{(typeof discountValue === 'string' ||
								typeof discountValue === null ||
								discountValue === undefined) &&
								'Coupon not found'}
						</span>
						<button onClick={handleDiscount}>ACTIVATE</button>
					</label>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.subtotal}>
					<SmallHeading className={styles.subTotalTitle} title={'Subtotal'} />
					<div className={styles.subPrice}>
						<p className={styles.bdi}>
							$
							{productsToRender &&
								productsToRender
									.reduce((acc, item) => acc + +item.regular_price, 0)
									.toFixed(2)}
						</p>
						<p className={styles.ins}>
							$
							{itemListCount &&
								itemListCount
									.reduce((acc, item) => acc + +item.price, 0)
									.toFixed(2)}
						</p>
					</div>
				</div>
				{discountValue &&
					typeof discountValue === 'object' &&
					discountValue.code &&
					discountValue.amount && (
						<div className={styles.countAndRemove}>
							<Description
								className={styles.countAndRemoveText}
								title={`Coupon: ${discountValue.code}`}
							/>
							<div className={styles.countAndRemoveText}>
								-$
								{itemListCount &&
									(
										(itemListCount.reduce(
											(acc, item) => acc + +item.price * +item.count,
											0
										) +
											// Добавляем стоимость доставки, если она выбрана
											(shipping &&
											shipping.find(item => item.label === selectShipping)?.cost
												? Number(
														shipping.find(item => item.label === selectShipping)
															?.cost
													)
												: 0)) *
										// Применяем скидку
										(discountValue && discountValue.amount
											? +discountValue.amount / 100
											: 0)
									).toFixed(2)}
								<button onClick={resetDiscount}>[Remove]</button>
							</div>
						</div>
					)}
				<div className={styles.divider}></div>
				<div className={styles.total}>
					<SmallHeading className={styles.totalTitle} title={'Total'} />
					<div className={styles.totalPrice}>
						<p className={styles.bdi}>
							$
							{productsToRender &&
								(
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
										: 0)
								).toFixed(2)}
						</p>
						<p className={styles.ins}>${discountTotal()}</p>
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
				{!!itemListCount.some(item => item.paymentType === 'subscription') && (
					<div>Remove subscribe item</div>
				)}
				{itemListCount.some(item => item.paymentType === 'subscription') ===
					false && (
					<div className={styles.btns}>
						<button
							className={styles.btn}
							disabled={
								!validateBtn() ||
								!!itemListCount.some(
									item => item.paymentType === 'subscription'
								)
							}
							onClick={handleBtn}
						>
							PLACE ORDER
						</button>
					</div>
				)}
				<div className={styles.orderAdv}>
					{order_advantages.map((item, index) => (
						<div key={item.text} className='flex gap-2'>
							<Image src={item.icon} alt={item.text} width={24} height={24} />
							<Description
								className={styles.textAd}
								title={ReactHtmlParser(item.text)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CheckoutForms
