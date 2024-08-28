'use client'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { useEffect, useState } from 'react'

interface ClientProductHandlerProps {
	products: WooCommerceSingleProduct[]
}

const ClientProductHandler: React.FC<ClientProductHandlerProps> = ({
	products
}) => {
	const [clientProducts, setClientProducts] = useState(products)

	useEffect(() => {
		// Здесь вы можете выполнять любую клиентскую логику с продуктами
		console.log('Продукты на клиенте:', clientProducts)
		// Пример обработки данных на клиенте
		const processedProducts = clientProducts.map(product => ({
			...product,
			name: product.name.toUpperCase() // Например, переводим имена в верхний регистр
		}))
		setClientProducts(processedProducts)
	}, [])

	return (
		<div>
			<h2>Обработанные продукты:</h2>
			<ul>
				{clientProducts.map(product => (
					<li key={product.id}>{product.name}</li>
				))}
			</ul>
		</div>
	)
}

export default ClientProductHandler
