'use client'

import VariableCard from '@/components/ui/singleProducts/variableCard/VariableCard'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'

interface IVariableSingle {
	data: WooCommerceSingleProduct
	template: SimpleSingle
}

const VariableSinglePage: FC<IVariableSingle> = ({ data, template }) => {
	usePushCookieUserCart()

	return (
		<main>
			<SingleHeader acf={template.acf} product={data}>
				<VariableCard {...data} product={data} />
			</SingleHeader>
		</main>
	)
}

export default VariableSinglePage
