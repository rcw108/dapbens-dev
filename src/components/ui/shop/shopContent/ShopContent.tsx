'use client'

import { Category, Tag } from '@/store/products/product.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import SkeletonLoader from '../../SkeletonLoader'
import FilterHeader from './filterHeader/FilterHeader'
import FilterItem from './filterItem/FilterItem'
import PaginationButton from './paginationButton/PaginationButton'
import styles from './ShopContent.module.scss'
import SingleProductCard from './singleProductCard/SingleProductCard'
import { sortData } from './sortBy.data'
import { useShopContent } from './useShopContent'

interface IShopContent {
	products: WooCommerceSingleProduct[]
	categories: Category[]
	tags: Tag[]
}

const ShopContent: FC<IShopContent> = ({ products, tags, categories }) => {
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

	const filteredProducts = () => {
		return sortedProducts.filter(
			product =>
				product.status !== 'private' && product.catalog_visibility !== 'hidden'
		)
	}

	return (
		<section className={clsx(styles.shop, { [styles.loading]: loading })}>
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
								<FilterHeader
									title='Availability'
									className={styles.availTop}
									handler={setAvailabilityTab}
									handlerValue={availabilityTab}
								/>

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
								<FilterHeader
									title='Categories'
									className={styles.catTop}
									handler={setCategiriesTab}
									handlerValue={categiriesTab}
								/>
								<FilterItem
									itemsArray={categories}
									handler={handleCategories}
									active={categoriesActive}
									tab={categiriesTab}
								/>
							</div>
							<div className={styles.tags}>
								<FilterHeader
									title='Tags'
									className={styles.tagTop}
									handler={setTagTab}
									handlerValue={tagTab}
								/>
								<FilterItem
									itemsArray={tags}
									handler={handleTags}
									active={tagActive}
									tab={tagTab}
								/>
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
								filteredProducts()
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
							<PaginationButton
								filteredProducts={filteredProducts}
								progressPagination={progressPagination}
								variant='prev'
								currentPagination={currentPagination}
								togglePagination={togglePagination}
							/>
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
							<PaginationButton
								filteredProducts={filteredProducts}
								progressPagination={progressPagination}
								variant='next'
								currentPagination={currentPagination}
								togglePagination={togglePagination}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShopContent
