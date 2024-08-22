import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { UserSingleProductCartWithCount } from '@/store/cart/cart.interface'
import Image from 'next/image'
import { FC } from 'react'
import styles from './SingleCartItem.module.scss'
const SingleCartItem: FC<UserSingleProductCartWithCount> = props => {
	const { toggleCartProduct } = useActions()

	const { itemListCount } = useCart()

	const itemCount = itemListCount.find(item => item.id === props.id)?.count || 0

	return (
		<div className={styles.item}>
			<div className={styles.remove} onClick={() => toggleCartProduct(props)}>
				<Image src='/trash.svg' alt='remove' width={14} height={14} />
			</div>
			<div className={styles.info}>
				<div className={styles.top}>
					<h6>{props.name}</h6>
				</div>
				<div className={styles.bottom}>{`${itemCount} × ${props.price}`}</div>
			</div>
			<div className={styles.image}>
				<Image
					src={props.images[0].src}
					alt={props.name}
					width={55}
					height={55}
				/>
			</div>
		</div>
	)
}

export default SingleCartItem
