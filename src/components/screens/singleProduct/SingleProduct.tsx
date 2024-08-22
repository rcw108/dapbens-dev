'use client'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import { FC, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleProduct.module.scss'

const SingleProduct: FC<{ data: WooCommerceSingleProduct }> = ({ data }) => {
	const { addToCart } = useActions()
	const { userCart } = useCart()

	const [count, setCount] = useState(1)

	const handleClick = (count: number = 1) => {
		addToCart({ ...data, count })
	}

	return (
		<section>
			<div className='container'>
				<div className={styles.single}>
					<h1>{data.name}</h1>
					<Image
						src={data.images[0].src}
						alt={data.name}
						width={300}
						height={300}
					/>
					<p>{ReactHtmlParser(data.price_html)}</p>
					<input
						className={styles.countInput}
						type='number'
						min={1}
						value={count}
						onChange={e => setCount(+e.target.value)}
					/>
					<button className={styles.btn} onClick={() => handleClick(count)}>
						Add to cart
					</button>
				</div>
			</div>
		</section>
	)
}

export default SingleProduct
