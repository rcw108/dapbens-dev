'use server'

import { getAllProducts } from '@/components/ui/home/products/productActions'
import ClientProductHandler from './ClientProductHandler'

const ServerProductComponent = async () => {
	const { products } = await getAllProducts()

	// Передаем данные в клиентский компонент
	return <ClientProductHandler products={products} />
}

export default ServerProductComponent
