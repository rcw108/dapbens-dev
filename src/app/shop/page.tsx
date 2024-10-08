import Shop from '@/components/screens/shop/Shop'
import {
	getAllProducts,
	getProductCategories,
	getProductTags
} from '@/components/ui/home/products/productActions'
import { shopPageUrl } from '@/configs/page.config'
import { IShopPage } from '@/types/shopPage.interface'
import { FC } from 'react'

export const revalidate = 1800

const fetchShopData = async () => {
	const response: IShopPage = await fetch(
		`${shopPageUrl}?acf_format=standard`
	).then(res => res.json())

	return response
}

export const metadata = {
	title: 'Shop - DABPENS'
}

const ShopPage: FC = async () => {
	const { products } = await getAllProducts()
	const categories = await getProductCategories()
	const tags = await getProductTags()

	const data = await fetchShopData()

	return (
		<>
			{data && products && categories && tags && (
				<Shop
					categories={categories}
					tags={tags}
					products={products}
					data={data}
				/>
			)}
		</>
	)
}

export default ShopPage
