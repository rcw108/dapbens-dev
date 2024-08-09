import SingleProduct from '@/components/screens/singleProduct/SingleProduct'
import { getSingleProductBySlug } from '@/components/ui/home/products/productActions'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'

export const revalidate = 1800

const SingleProductPage: FC<{ params: { slug: string } }> = async ({
	params
}) => {
	const product: WooCommerceSingleProduct = await getSingleProductBySlug(
		params.slug
	)

	if (!product) {
		return <div>Product not found</div>
	}

	return <SingleProduct data={product} />
}

export default SingleProductPage
