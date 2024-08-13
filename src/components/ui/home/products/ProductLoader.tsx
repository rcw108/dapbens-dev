import { getAllProducts } from './productActions'
import ProductList from './ProductList'

const ProductLoader = async () => {
	const { products, popularCategories } = await getAllProducts()
	return (
		<ProductList products={products} popularCategories={popularCategories} />
	)
}

export default ProductLoader
