'use client'

import { useActions } from '@/hooks/useActions'
import { useGetAllSingleProducts } from '@/hooks/useGetAllSingleProducts'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import dynamic from 'next/dynamic'
import { FC, useEffect } from 'react'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'

interface IBundleSinglePage {
	data: WooCommerceSingleProduct
	template: SimpleSingle
}

const DynamicBundleCard = dynamic(
	() => import('../../ui/singleProducts/bundleCard/BundleCard'),
	{}
)

const BundleSinglePage: FC<IBundleSinglePage> = ({ data, template }) => {
	usePushCookieUserCart()

	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	const { products } = useGetAllSingleProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [products])

	return (
		<main>
			<SingleHeader acf={template.acf} product={data}>
				<DynamicBundleCard {...data} product={data} />
			</SingleHeader>
		</main>
	)
}

export default BundleSinglePage
