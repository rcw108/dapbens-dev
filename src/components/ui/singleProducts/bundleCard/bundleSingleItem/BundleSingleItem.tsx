'use client'

import { BundleItem } from '@/store/cart/cart.interface'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import stylesSimpleCard from '../../simpleCard/SimpleCard.module.scss'
import { BundleItemSingle } from '../BundleCard'
import styles from './BundleSingleItem.module.scss'

interface BundleSingleItemProps extends BundleItemSingle {
	handler: (items: BundleItem[]) => void
	items: BundleItem[]
}

const BundleSingleItem: FC<BundleSingleItemProps> = ({
	id,
	image,
	name,
	slug,
	stock_status,
	tags,
	items,
	handler
}) => {
	const [count, setCount] = useState(0)

	const handlerClick = (variant: 'minus' | 'plus') => {
		if (variant === 'minus') {
			setCount(count - 1)
		} else {
			setCount(count + 1)
		}

		const itemCounts = items.filter(item => item.id !== id)

		const newItem = { id, name, count: count, image: image.src }

		if (count <= 0) {
			const handlerItems = items.filter(item => item.id !== id)
			handler(handlerItems)
		} else {
			itemCounts.push(newItem)
			handler(itemCounts)
		}
	}

	return (
		<div className={styles.item}>
			<div
				className={clsx(styles.tag, {
					[styles.indica]: tags[0].name === 'Indica',
					[styles.sativa]: tags[0].name === 'Sativa',
					[styles.hybrid]: tags[0].name === 'Hybrid'
				})}
			>
				{tags[0].name}
			</div>
			<div className={styles.wrap}>
				<div className={styles.left}>
					<Image src={image.src} alt={name} width={65} height={65} />
				</div>
				<div className={styles.right}>
					<h5>{name}</h5>
					<span className={styles.link}>
						<Link href={`/products/${slug}`} />
					</span>
					<div
						className={clsx(styles.stock, {
							[styles.out]: stock_status === 'outofstock'
						})}
					>
						{stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
					</div>
					<div className={clsx(stylesSimpleCard.count, styles.countBundle)}>
						<div
							className={clsx(stylesSimpleCard.minus, styles.minusBundle)}
							onClick={() => handlerClick('minus')}
						>
							-
						</div>
						<input
							type='number'
							value={count}
							onChange={e => setCount(+e.target.value)}
						/>
						<div
							className={clsx(stylesSimpleCard.plus, styles.plusBundle)}
							onClick={() => handlerClick('plus')}
						>
							+
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BundleSingleItem
