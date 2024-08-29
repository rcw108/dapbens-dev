import BundleSinglePage from '@/components/screens/singleProduct/BundleSinglePage'
import SimpleSinglePage from '@/components/screens/singleProduct/SimpleSingle'
import VariableSinglePage from '@/components/screens/singleProduct/VariableSingle'
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
	if (product.type !== 'variable' && product.type !== 'bundle') {
		const pageTemplate: SimpleSingle = await fetch(simpleSingleProductUrl).then(
			res => res.json()
		)
		return (
			<SimpleSinglePage all={products} template={pageTemplate} data={product} />
		)
	}
	if (product.type === 'variable') {
		const pageTemplate: SimpleSingle = await fetch(simpleSingleProductUrl).then(
			res => res.json()
		)
		return (
			<VariableSinglePage
				all={products}
				template={pageTemplate}
				data={product}
			/>
		)
	}
	if (product.type === 'bundle') {
		const pageTemplate: SimpleSingle = await fetch(simpleSingleProductUrl).then(
			res => res.json()
		)
		return (
			<BundleSinglePage all={products} template={pageTemplate} data={product} />
		)
	}
	if (!product) {
		return <div>Product not found</div>
	}
}
export default SingleProductPage
