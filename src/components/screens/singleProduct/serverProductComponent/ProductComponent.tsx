import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'

const ProductComponent: FC<{ products: WooCommerceSingleProduct[] }> = ({
	products
}) => {
	console.log(products)
	return <div>ProductComponent</div>
}

export default ProductComponent
