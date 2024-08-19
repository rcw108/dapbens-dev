'use client'

import { useProducts } from '@/hooks/useProducts'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
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
		setSortedProducts,
		stockStatus,
		handleReset,
		availabilityActive,
		availabilityTab,
		categiriesTab,
		categoriesActive,
		createQueryString,
		setAvailabilityActive,
		setAvailabilityTab,
		setCategiriesTab,
		setCategoriesActive,
		setTagActive,
		setTagTab,
		tagActive,
		tagTab
	} = useShopContent()

	useEffect(() => {
		setProducts(products)
		setSortedProducts(products)
	}, [products, setProducts])

	const handleCategories = (category: string) => {
		console.log(category, categoriesActive)
		if (category === categoriesActive) {
			setCategoriesActive('')
		} else {
			setCategoriesActive(category)
		}
	}

	const handleTags = (tag: string) => {
		console.log(tag, tagActive)
		if (tag === tagActive) {
			setTagActive('')
		} else {
			setTagActive(tag)
		}
	}

	return (
		<section className={styles.shop}>
			<div className='container'>
				<div className={styles.wrapper}>
					<div className={styles.top}>
						<h5>Sort By:</h5>
						<div className={styles.selectBlock}>
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
					</div>
					<div className={styles.center}>
						<div className={styles.filters}>
							<div className={styles.top}>
								<h4>Filter Products</h4>
								<Image
									src='/settings.svg'
									alt='settings'
									width={28}
									height={28}
								/>
							</div>
							<div className={styles.availability}>
								<div
									className={styles.availTop}
									onClick={() => setAvailabilityTab(!availabilityTab)}
								>
									<h4>Availability</h4>
									<Image
										src='/select.svg'
										alt='select'
										width={18}
										height={18}
									/>
								</div>
								<div
									className={clsx(
										styles.choice,
										availabilityTab && styles.active
									)}
								>
									<div style={{ minHeight: 0 }}>
										{stockStatus && (
											<div>
												<div
													onClick={() => setAvailabilityActive('stock')}
													className={clsx(styles.item, {
														[styles.active]: availabilityActive === 'stock'
													})}
												>
													<div
														className={clsx(styles.circle, {
															[styles.active]: availabilityActive === 'stock'
														})}
													></div>
													<h5>In Stock ({stockStatus.stock})</h5>
												</div>
												<div
													onClick={() => setAvailabilityActive('out')}
													className={clsx(styles.item, {
														[styles.active]: availabilityActive === 'out'
													})}
												>
													<div
														className={clsx(styles.circle, {
															[styles.active]: availabilityActive === 'out'
														})}
													></div>
													<h5>Out of Stock ({stockStatus.outOfStock})</h5>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>

							<div className={styles.categories}>
								<div
									className={styles.catTop}
									onClick={() => setCategiriesTab(!categiriesTab)}
								>
									<h4>Categories</h4>
									<Image
										src='/select.svg'
										alt='select'
										width={18}
										height={18}
									/>
								</div>
								<div
									className={clsx(
										styles.choice,
										categiriesTab && styles.active
									)}
								>
									{categories &&
										categories.map(category => {
											if (category.count === 0) return null

											return (
												<div
													key={category.id}
													onClick={() => handleCategories(category.name)}
													className={clsx(styles.item, {
														[styles.active]: categoriesActive === category.name
													})}
												>
													<div
														className={clsx(styles.circle, {
															[styles.active]:
																categoriesActive === category.name
														})}
													></div>
													<h5>{ReactHtmlParser(category.name)}</h5>
												</div>
											)
										})}
								</div>
							</div>
							<div className={styles.tags}>
								<div
									className={styles.tagTop}
									onClick={() => setTagTab(!tagTab)}
								>
									<h4>Tags</h4>
									<Image
										src='/select.svg'
										alt='select'
										width={18}
										height={18}
									/>
								</div>
								<div className={clsx(styles.choice, tagTab && styles.active)}>
									{tags &&
										tags.map(tag => {
											if (tag.count === 0) return null
											return (
												<div
													key={tag.id}
													onClick={() => handleTags(tag.name)}
													className={clsx(styles.item, {
														[styles.active]: tagActive === tag.name
													})}
												>
													<div
														className={clsx(styles.circle, {
															[styles.active]: tagActive === tag.name
														})}
													></div>
													<h5>{ReactHtmlParser(tag.name)}</h5>
												</div>
											)
										})}
								</div>
							</div>
							<div className={styles.reset}>
								<button
									className={styles.btn}
									onClick={() => {
										handleReset
									}}
								>
									Reset Filters
								</button>
							</div>
						</div>
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
