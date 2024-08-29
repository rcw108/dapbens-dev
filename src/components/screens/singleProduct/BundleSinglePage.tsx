'use client'

import BundleCard from '@/components/ui/singleProducts/bundleCard/BundleCard'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect } from 'react'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'

interface IBundleSinglePage {
	data: WooCommerceSingleProduct
	template: SimpleSingle
	all: WooCommerceSingleProduct[]
}

const BundleSinglePage: FC<IBundleSinglePage> = ({ data, template, all }) => {
	usePushCookieUserCart()

	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(all)
	}, [])

	return (
		<main>
			<SingleHeader acf={template.acf} product={data}>
				<BundleCard {...data} product={data} />
			</SingleHeader>
		</main>
	)
}

export default BundleSinglePage
