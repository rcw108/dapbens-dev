import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import {
	ItemListCount,
	UserSingleProductCartWithCount
} from '@/store/cart/cart.interface'
import Image from 'next/image'
import { FC } from 'react'
import styles from './SingleCartItem.module.scss'
const SingleCartItem: FC<{
	product: UserSingleProductCartWithCount
	listItemData: ItemListCount[]
}> = ({ product, listItemData }) => {
	const { toggleCartProduct } = useActions()

	const { itemListCount } = useCart()

	const period = itemListCount.find(item => item.id === product.id)
	console.log(period)

	const itemCount =
		itemListCount.find(item => item.id === product.id)?.count || 0

	return (
		<div className={styles.item}>
			<div className={styles.remove} onClick={() => toggleCartProduct(product)}>
				<Image src='/trash.svg' alt='remove' width={14} height={14} />
			</div>
			<div className={styles.info}>
				<div className={styles.top}>
					<h6>{product.name}</h6>
				</div>
				<div className={styles.bottom}>
					{period &&
						(period.paymentType === 'subscription'
							? `${itemCount} × ${period.subscriptionPrice} ${period.subscriptionPeriod}`
							: `${itemCount} × ${product.price}`)}
				</div>
			</div>
			<div className={styles.image}>
				<Image
					src={product.images[0].src}
					alt={product.name}
					width={55}
					height={55}
				/>
			</div>
		</div>
	)
}

export default SingleCartItem
