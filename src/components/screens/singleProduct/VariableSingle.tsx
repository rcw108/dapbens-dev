'use client'

import VariableCard from '@/components/ui/singleProducts/variableCard/VariableCard'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect } from 'react'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'

interface IVariableSingle {
	data: WooCommerceSingleProduct
	template: SimpleSingle
	all: WooCommerceSingleProduct[]
}

const VariableSinglePage: FC<IVariableSingle> = ({ data, template, all }) => {
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
				<VariableCard {...data} product={data} />
			</SingleHeader>
		</main>
	)
}

export default VariableSinglePage
