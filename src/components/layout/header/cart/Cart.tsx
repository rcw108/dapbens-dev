import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useCart } from '@/hooks/useCart'
import { useCartContext } from '@/providers/CartContextProvider'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import stylesHeader from '../Header.module.scss'
import styles from './Cart.module.scss'
import SingleCartItem from './singleCartItem/SingleCartItem'

const Cart: FC = () => {
	const [cartCount, setCartCount] = useState(0)
	const { openCart, setOpenCart } = useCartContext()

	const { userCart, itemListCount } = useCart()

	useEffect(() => {
		if (itemListCount) {
			setCartCount(itemListCount.length)
		}
	}, [itemListCount])

	const totalPrice = (): number => {
		let total: number = 0
		itemListCount.forEach(listItem => {
			if (
				listItem.paymentType === 'subscription' &&
				listItem.subscriptionPrice
			) {
				total += listItem.count * +listItem.subscriptionPrice
			} else if (listItem.id && listItem.paymentType === 'one-time') {
				total += listItem.count * +listItem.price
			}
		})
		return +total.toFixed(2)
	}

	useEffect(() => {
		const totalCart: number = itemListCount.reduce(
			(acc, curr) => acc + curr.count,
			0
		)

		setCartCount(totalCart)
	}, [itemListCount])

	console.log('cart: ', openCart)

	return (
		<>
			<div className={stylesHeader.cart} onClick={() => setOpenCart(!openCart)}>
				{cartCount > 9 ? '9+' : cartCount}
			</div>
			<div
				className={clsx(styles.background, { [styles.openBg]: openCart })}
				onClick={() => setOpenCart(false)}
			></div>
			<div className={clsx(styles.cartBox, openCart && styles.open)}>
				<div className={styles.top}>
					<SmallHeading className={styles.title} title='Your Cart' />
					<div className={styles.close} onClick={() => setOpenCart(false)}>
						<Image src='/close.svg' alt='close cart' width={26} height={26} />
					</div>
				</div>
				{itemListCount.length > 0 ? (
					<>
						<div className={styles.progress}>
							<div className={styles.progressLine}>
								<div
									className={styles.activeLine}
									style={{
										width: `${totalPrice() * 2}%`
									}}
								></div>
							</div>
							{totalPrice() === 0 ? (
								<h6>
									Get free shipping for orders over <span>$50.00</span>
								</h6>
							) : totalPrice() < 50 ? (
								<h6>
									{"You're"}{' '}
									<span className='font-bold'>{`$${(50 - totalPrice()).toFixed(2)}`}</span>{' '}
									away from free shipping.
								</h6>
							) : (
								<h6>
									<Image
										style={{ display: 'inline-block', marginRight: '5px' }}
										src='/check.svg'
										alt='check'
										width={14}
										height={14}
									/>
									Your order qualifies for free shipping!
								</h6>
							)}
						</div>

						<div className={styles.store}>
							<div className={styles.topDivider}></div>
							{itemListCount.map(product => (
								<SingleCartItem
									listItemData={product}
									key={`${product.id}-${product.name}`}
								/>
							))}
							<div className={styles.beforeGo}></div>
						</div>

						<div className={styles.total}>
							<div className={styles.totalTop}>
								<SmallHeading className={styles.subtotal} title='Subtotal: ' />
							</div>
							<div className={styles.totalPrice}>
								{'$'}
								{totalPrice()}
							</div>
						</div>
						<div className={styles.btns}>
							<button>
								<Image src='/lock.svg' alt='checkout' width={14} height={14} />
								<span>Checkout</span>
							</button>
						</div>
					</>
				) : (
					<div className={styles.emptyCart}>
						<Image
							className='inline mb-5 text-center ml-[-15px]'
							src='/empty-cart.svg'
							alt='empty cart'
							width={70}
							height={70}
						/>
						<h4>No products in the cart.</h4>
					</div>
				)}
			</div>
		</>
	)
}

export default Cart
