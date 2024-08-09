import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'

const SingleProduct: FC<{ data: WooCommerceSingleProduct }> = ({ data }) => {
	return (
		<div>
			{data.categories.map(category => (
				<div key={category.id}>{category.name}</div>
			))}
		</div>
	)
}

export default SingleProduct
