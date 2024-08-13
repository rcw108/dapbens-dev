'use client'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { sortByRatingCount } from '@/utils/sortByRatingCount'
import { sortProductsByCategories } from '@/utils/sortProductsByCategory'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderButton from '../../button/sliderButton/SliderButton'
import styles from './ProductList.module.scss'
import ProductSliderCard from './productSliderCard/ProductSliderCard'

interface ProductListProps {
	products: WooCommerceSingleProduct[]
	popularCategories: string[]
}

const ProductList: FC<ProductListProps> = ({ products, popularCategories }) => {
	const [activeTab, setActiveTab] = useState<'first' | 'second'>('first')
	const [firstCategoryList, setFirstCategoryList] = useState<
		WooCommerceSingleProduct[]
	>([])
	const [secondCategoryList, setSecondCategoryList] = useState<
		WooCommerceSingleProduct[]
	>([])

	console.log(firstCategoryList.length, secondCategoryList.length)

	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()
	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)

		setFirstCategoryList(
			sortByRatingCount(
				sortProductsByCategories(popularCategories[0], products)
			)
		)

		setSecondCategoryList(
			sortByRatingCount(
				sortProductsByCategories(popularCategories[1], products)
			)
		)
	}, [])

	const handleTabClick = () => {
		if (activeTab === 'first') {
			setActiveTab('second')
		} else {
			setActiveTab('first')
		}
	}

	return (
		<>
			<div className={styles.tabs}>
				<div className={styles.box}>
					<div
						onClick={handleTabClick}
						className={clsx(styles.tab, {
							[styles.activeTab]: activeTab === 'first'
						})}
					>
						<h6>{popularCategories[0]}</h6>
					</div>
					<div
						onClick={handleTabClick}
						className={clsx(styles.tab, {
							[styles.activeTab]: activeTab === 'second'
						})}
					>
						<h6>{popularCategories[1]}</h6>
					</div>
				</div>
			</div>
			<div
				className={clsx(styles.firstCategoryTab, {
					[styles.active]: activeTab === 'first'
				})}
			>
				{firstCategoryList && firstCategoryList.length > 0 && (
					<>
						<Swiper
							modules={[Navigation, Pagination]}
							pagination={{ clickable: true }}
							slidesPerView={4}
							centeredSlides
							autoplay
							initialSlide={2}
							loop
							spaceBetween={32}
						>
							<SliderButton variant='left' />
							{firstCategoryList.slice(0, 6).map(product => {
								if (product.catalog_visibility === 'hidden') return
								return (
									<SwiperSlide key={product.id}>
										{({ isActive }) => {
											return (
												<ProductSliderCard
													slideState={isActive}
													product={product}
												/>
											)
										}}
									</SwiperSlide>
								)
							})}
							<SliderButton variant='right' />
						</Swiper>
					</>
				)}
			</div>
			<div
				className={clsx(styles.secondCategoryTab, {
					[styles.active]: activeTab === 'second'
				})}
			>
				{secondCategoryList && secondCategoryList.length > 0 && (
					<Swiper
						modules={[Navigation, Pagination]}
						pagination={{ clickable: true }}
						slidesPerView={4}
						centeredSlides
						autoplay
						initialSlide={2}
						loop
						spaceBetween={32}
					>
						<SliderButton variant='left' />
						{secondCategoryList.slice(0, 6).map(product => {
							if (product.catalog_visibility === 'hidden') return
							return (
								<SwiperSlide key={product.id}>
									{({ isActive }) => {
										return (
											<ProductSliderCard
												slideState={isActive}
												product={product}
											/>
										)
									}}
								</SwiperSlide>
							)
						})}
						<SliderButton variant='right' />
					</Swiper>
				)}
			</div>
		</>
	)
}

export default ProductList
