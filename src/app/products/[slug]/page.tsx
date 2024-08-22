import SingleProduct from '@/components/screens/singleProduct/SingleProduct'
import {
	getAllProducts,
	getSingleProductBySlug
} from '@/components/ui/home/products/productActions'
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

	if (!product) {
		return <div>Product not found</div>
	}

	return <SingleProduct allProducts={products} data={product} />
}

export default SingleProductPage
