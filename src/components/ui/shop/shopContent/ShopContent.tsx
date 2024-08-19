'use client'

import { useProducts } from '@/hooks/useProducts'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import styles from './ShopContent.module.scss'
import SingleProductCard from './singleProductCard/SingleProductCard'
import { sortData } from './sortBy.data'
import { useShopContent } from './useShopContent'

const ShopContent: FC<{ products: WooCommerceSingleProduct[] }> = ({
	products
}) => {
	const { categories, isLoading, tags } = useProducts()
	const searchParams = useSearchParams()

	const {
		availableTags,
		handleSortBy,
		selectCategory,
		selectTag,
		sortedProducts,
		setAvailableTags,
		setSelectCategory,
		setSelectTag,
		sortBy,
		setProducts,
		defaultProducts,
		setSortedProducts
	} = useShopContent()

	useEffect(() => {
		setProducts(products)
		setSortedProducts(products)
	}, [products, setProducts])

	return (
		<section className={styles.shop}>
			<div className='container'>
				<div className={styles.wrapper}>
					<div className={styles.top}>
						<h5>Sort By:</h5>
						<select
							className={styles.select}
							value={sortBy}
							onChange={e => handleSortBy(e.target.value)}
						>
							{sortData.map(item => (
								<option key={item.id} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
					</div>
					<div className={styles.center}>
						<div className={styles.filters}></div>
						<div className={styles.content}>
							{sortedProducts.length > 0 ? (
								sortedProducts.map(product => {
									if (product.status === 'private') return null
									if (product.catalog_visibility === 'hidden') return null

									return <SingleProductCard key={product.id} {...product} />
								})
							) : (
								<div>No products</div>
							)}
						</div>
					</div>
					<div className={styles.bottom}></div>
				</div>
			</div>
		</section>
	)
}

export default ShopContent
