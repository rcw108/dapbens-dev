'use client'

import { useProducts } from '@/hooks/useProducts'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import SkeletonLoader from '../../SkeletonLoader'
import styles from './ShopContent.module.scss'
import SingleProductCard from './singleProductCard/SingleProductCard'
import { sortData } from './sortBy.data'
import { useShopContent } from './useShopContent'

const ShopContent: FC<{ products: WooCommerceSingleProduct[] }> = ({
	products
}) => {
	const { categories, isLoading, tags } = useProducts()
	const {
		currentPagination,
		progressPagination,
		handleSortBy,
		sortedProducts,
		sortBy,
		setProducts,
		setSortedProducts,
		stockStatus,
		handleReset,
		availabilityActive,
		availabilityTab,
		categiriesTab,
		categoriesActive,
		setAvailabilityActive,
		setAvailabilityTab,
		setCategiriesTab,
		setTagTab,
		tagActive,
		tagTab,
		togglePagination,
		handleCategories,
		handleTags,
		totalPagesCount,
		loading,
		setLoading
	} = useShopContent()

	useEffect(() => {
		setLoading(true)
		setProducts(products)
		setSortedProducts(products)
		setLoading(false)
	}, [products, setProducts])

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
										handleReset()
									}}
								>
									Reset Filters
								</button>
							</div>
						</div>
						<div className={styles.content} id='products'>
							{loading ? (
								<div className={styles.skeleton}>
									{<SkeletonLoader count={12} width={300} height={300} />}
								</div>
							) : sortedProducts.length > 0 ? (
								sortedProducts
									.filter(
										product =>
											product.status !== 'private' &&
											product.catalog_visibility !== 'hidden'
									)
									.slice(currentPagination, progressPagination)
									.map(product => {
										if (product.status === 'private') return null
										if (product.catalog_visibility === 'hidden') return null

										return <SingleProductCard key={product.id} {...product} />
									})
							) : (
								<div>No products</div>
							)}
						</div>
					</div>
					<div className={styles.bottom}>
						<div className={styles.pagination}>
							<div className={styles.prev}>
								<button
									className={clsx(styles.prevBtn, {
										[styles.disabled]: currentPagination === 0
									})}
									onClick={() => {
										togglePagination(currentPagination / 12 - 1)
									}}
								>
									<Image
										style={{ transform: 'rotate(180deg)' }}
										src={'/arrow.svg'}
										alt='arrow'
										width={15}
										height={15}
									/>
								</button>
							</div>
							{[...Array(totalPagesCount())].map((_, index) => (
								<button
									className={clsx(styles.paginationBtn, {
										[styles.activePagination]:
											index * 12 === currentPagination ||
											index === currentPagination
									})}
									onClick={() => togglePagination(index)}
									key={index}
								>
									{index + 1}
								</button>
							))}
							<div className={styles.next}>
								<button
									className={clsx(styles.nextBtn, {
										[styles.disabled]:
											progressPagination ===
												sortedProducts.filter(
													product =>
														product.status !== 'private' &&
														product.catalog_visibility !== 'hidden'
												).length ||
											progressPagination >=
												sortedProducts.filter(
													product =>
														product.status !== 'private' &&
														product.catalog_visibility !== 'hidden'
												).length
									})}
									onClick={() => togglePagination(currentPagination / 12 + 1)}
								>
									<Image
										src={'/arrow.svg'}
										alt='arrow'
										width={15}
										height={15}
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShopContent
