'use client'

import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect } from 'react'
import SimpleCard from '../../ui/singleProducts/simpleCard/SimpleCard'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'

interface ISimpleSingle {
	data: WooCommerceSingleProduct
	allProducts: WooCommerceSingleProduct[]
	template: SimpleSingle
}

const SimpleSinglePage: FC<ISimpleSingle> = ({
	allProducts,
	data,
	template
}) => {
	const { pushAllProducts, addToCart } = useActions()
	const { products } = useProducts()

	useEffect(() => {
		if (products) return
		localStorage.setItem('products', JSON.stringify(allProducts))
		pushAllProducts(allProducts)
	}, [])

	usePushCookieUserCart()

	return (
		<main>
			<SingleHeader acf={template.acf} product={data}>
				<SimpleCard {...data} product={data} />
			</SingleHeader>
		</main>
	)
}

export default SimpleSinglePage
