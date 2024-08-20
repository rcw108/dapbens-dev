'use client'

import FormSection from '@/components/ui/home/formSection/FormSection'
import MarqueeLineSection from '@/components/ui/shop/marqueeLineSection/MarqueeLineSection'
import ReviewsSectionShop from '@/components/ui/shop/reviewSectionShop/ReviewSectionShop'
import ShopContent from '@/components/ui/shop/shopContent/ShopContent'
import ShopHead from '@/components/ui/shop/shopHead/ShopHead'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { Category, Tag } from '@/store/products/product.interface'
import { IShopPage } from '@/types/shopPage.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import dynamic from 'next/dynamic'
import { FC, Suspense, useEffect } from 'react'

const DynamicShopContent = dynamic(
	() => import('@/components/ui/shop/shopContent/ShopContent'),
	{}
)

interface IShop {
	products: WooCommerceSingleProduct[]
	data: IShopPage
	tags: Tag[]
	categories: Category[]
}

const Shop: FC<IShop> = ({ data, products, categories, tags }) => {
	const { pushAllProducts, pushCategories, pushTags } = useActions()
	const {
		products: allProducts,
		categories: allCategories,
		tags: allTags
	} = useProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [])

	useEffect(() => {
		if (allCategories) return
		pushCategories(categories)
	}, [])

	useEffect(() => {
		if (allTags) return
		pushTags(tags)
	}, [])

	return (
		<main>
			<ShopHead
				bg_image_head={data.acf.bg_image_head}
				description_head={data.acf.description_head}
				marquee_head={data.acf.marquee_head}
				marquee_bg_head={data.acf.marquee_bg_head}
				rate_star_image={data.acf.rate_star_image}
				rate_stars_description={data.acf.rate_stars_description}
				title_head={data.acf.title_head}
			/>
			<Suspense>
				<ShopContent categories={categories} tags={tags} products={products} />
			</Suspense>
			<MarqueeLineSection
				marquee_line_bg={data.acf.marquee_line_bg}
				marquee_line_repeater={data.acf.marquee_line_repeater}
			/>
			<ReviewsSectionShop
				title_review={data.acf.title_review}
				reviews_repeater={data.acf.reviews_repeater}
				subtitle_review={data.acf.subtitle_review}
			/>
			<FormSection
				background_image_form={data.acf.form_bg}
				form_description={data.acf.form_description}
				form_title={data.acf.form_title}
			/>
		</main>
	)
}

export default Shop
