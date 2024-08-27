import SimpleSinglePage from '@/components/screens/singleProduct/SimpleSingle'
import SingleProduct from '@/components/screens/singleProduct/SingleProduct'
import {
	getAllProducts,
	getSingleProductBySlug
} from '@/components/ui/home/products/productActions'
import { simpleSingleProductUrl } from '@/configs/product.config'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'

export const revalidate = 1800

const SingleProductPage: FC<{ params: { slug: string } }> = async ({
	params
}) => {
	const { products } = await getAllProducts()

	const product: WooCommerceSingleProduct = await getSingleProductBySlug(
		params.slug
	)

	if (product.type === 'simple') {
		const pageTemplate: SimpleSingle = await fetch(simpleSingleProductUrl).then(
			res => res.json()
		)

		return (
			<SimpleSinglePage
				allProducts={products}
				template={pageTemplate}
				data={product}
			/>
		)
	}

	if (!product) {
		return <div>Product not found</div>
	}

	return <SingleProduct allProducts={products} data={product} />
}

export default SingleProductPage
