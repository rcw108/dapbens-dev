'use client'

import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'
import SimpleCard from '../../ui/singleProducts/simpleCard/SimpleCard'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'

interface ISimpleSingle {
	data: WooCommerceSingleProduct
	template: SimpleSingle
}

const SimpleSinglePage: FC<ISimpleSingle> = ({ data, template }) => {
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
