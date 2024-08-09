'use client'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Link from 'next/link'
import { FC, useEffect } from 'react'

interface ProductListProps {
	products: WooCommerceSingleProduct[]
}

const ProductList: FC<ProductListProps> = ({ products }) => {
	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()
	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [])

	return (
		<div>
			{products.map(product => {
				if (product.status !== 'publish') return
				return (
					<div key={product.id}>
						<Link href={`/products/${product.slug}`}>{product.name}</Link>
					</div>
				)
			})}
		</div>
	)
}

export default ProductList
