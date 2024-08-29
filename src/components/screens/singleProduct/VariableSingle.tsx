'use client'

import VariableCard from '@/components/ui/singleProducts/variableCard/VariableCard'
import { useActions } from '@/hooks/useActions'
import { useGetAllSingleProducts } from '@/hooks/useGetAllSingleProducts'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect } from 'react'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'

interface IVariableSingle {
	data: WooCommerceSingleProduct
	template: SimpleSingle
}

const VariableSinglePage: FC<IVariableSingle> = ({ data, template }) => {
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
				<VariableCard {...data} product={data} />
			</SingleHeader>
		</main>
	)
}

export default VariableSinglePage
