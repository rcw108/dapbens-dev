'use client'

import { Category, Tag } from '@/store/products/product.interface'
import { ShopACF } from '@/types/shopPage.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import SkeletonLoader from '../../SkeletonLoader'
import FilterHeader from './filterHeader/FilterHeader'
import FilterItem from './filterItem/FilterItem'
import styles from './ShopContent.module.scss'
import SingleProductCard from './singleProductCard/SingleProductCard'
import { useShopContent } from './useShopContent'

interface IShopContent
	extends Pick<
		ShopACF,
		| 'bundle_section_image'
		| 'disposables_section_image'
		| 'cartridges_section_image'
		| 'gummy_section_image'
	> {
	products: WooCommerceSingleProduct[]
	categories: Category[]
	tags: Tag[]
}

const ShopContent: FC<IShopContent> = ({
	products,
	tags,
	categories,
	bundle_section_image,
	cartridges_section_image,
	disposables_section_image,
	gummy_section_image
}) => {
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
		setLoading,
		disposablesProducts,
		bundleProducts,
		cartridgesProducts,
		gummyProducts
	} = useShopContent()

	const [bundleLoad, setBundleLoad] = useState<number>(7)
	const [gummyLoad, setGummyLoad] = useState<number>(7)
	const [cartridgeLoad, setCartridgeLoad] = useState<number>(7)
	const [disposiblesLoad, setDisposiblesLoad] = useState<number>(7)

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
					{/* <div className={styles.top}>
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
					</div> */}
					<div className={styles.center}>
						<div className={styles.filters}>
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
						</div>
						<div className={styles.content} id='products'>
							{loading ? (
								<div className={styles.skeleton}>
									{<SkeletonLoader count={12} width={300} height={300} />}
								</div>
							) : sortedProducts.length > 0 ? (
								<>
									{bundleProducts.length > 0 && (
										<>
											<div className={styles.bundle}>
												<div className='relative w-full h-full'>
													<Image
														src={bundle_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{bundleProducts.slice(0, bundleLoad).map(product => {
													if (product.status === 'private') return null
													if (product.catalog_visibility === 'hidden')
														return null

													return (
														<SingleProductCard
															key={product.id * 11}
															{...product}
														/>
													)
												})}
											</div>
											{bundleLoad < bundleProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]: bundleLoad < bundleProducts.length
													})}
													onClick={() => setBundleLoad(bundleLoad + 8)}
												>
													Load More
												</button>
											)}
										</>
									)}
									{gummyProducts.length > 0 && (
										<>
											<div className={styles.gummy}>
												<div className='relative w-full h-full'>
													<Image
														src={gummy_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{gummyProducts.slice(0, gummyLoad).map(product => {
													if (product.status === 'private') return null
													if (product.catalog_visibility === 'hidden')
														return null

													return (
														<SingleProductCard
															key={product.id * 12}
															{...product}
														/>
													)
												})}
											</div>
											{gummyLoad < gummyProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]: gummyLoad < gummyProducts.length
													})}
													onClick={() => setGummyLoad(gummyLoad + 8)}
												>
													Load More
												</button>
											)}
										</>
									)}
									{cartridgesProducts.length > 0 && (
										<>
											<div className={styles.cartrigdes}>
												<div className='relative w-full h-full'>
													<Image
														src={cartridges_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{cartridgesProducts
													.slice(0, cartridgeLoad)
													.map(product => {
														if (product.status === 'private') return null
														if (product.catalog_visibility === 'hidden')
															return null

														return (
															<SingleProductCard
																key={product.id * 13}
																{...product}
															/>
														)
													})}
											</div>
											{cartridgeLoad < cartridgesProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]:
															cartridgeLoad < cartridgesProducts.length
													})}
													onClick={() => setCartridgeLoad(cartridgeLoad + 8)}
												>
													Load More
												</button>
											)}
										</>
									)}
									{disposablesProducts.length > 0 && (
										<>
											<div className={styles.disp}>
												<div className='relative w-full h-full'>
													<Image
														src={disposables_section_image}
														alt='disposables'
														fill
														draggable={false}
													/>
												</div>
												{disposablesProducts
													.slice(0, disposiblesLoad)
													.map(product => {
														if (product.status === 'private') return null
														if (product.catalog_visibility === 'hidden')
															return null

														return (
															<SingleProductCard
																key={product.id * 14}
																{...product}
															/>
														)
													})}
											</div>
											{disposiblesLoad < disposablesProducts.length && (
												<button
													className={clsx(styles.loadMore, {
														[styles.active]:
															disposiblesLoad < disposablesProducts.length
													})}
													onClick={() =>
														setDisposiblesLoad(disposiblesLoad + 8)
													}
												>
													Load More
												</button>
											)}
										</>
									)}
								</>
							) : (
								<div>No products</div>
							)}
						</div>
					</div>
					{/* <div className={styles.bottom}>
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
					</div> */}
				</div>
			</div>
		</section>
	)
}

export default ShopContent
