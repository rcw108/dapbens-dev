'use client'

import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleProduct.module.scss'

const SingleProduct: FC<{
	data: WooCommerceSingleProduct
	allProducts: WooCommerceSingleProduct[]
}> = ({ data, allProducts }) => {
	const { addToCart, pushAllProducts, addCartArray } = useActions()
	const { products } = useProducts()

	useEffect(() => {
		if (products) return
		pushAllProducts(allProducts)
	}, [])

	usePushCookieUserCart()

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
