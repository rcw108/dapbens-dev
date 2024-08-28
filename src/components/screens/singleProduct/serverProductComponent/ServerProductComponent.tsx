'use server'

import { getAllProducts } from '@/components/ui/home/products/productActions'
import { FC } from 'react'

const ServerProductComponent: FC = async () => {
	const { products } = await getAllProducts()

	return <h1>1</h1>
}

export default ServerProductComponent
