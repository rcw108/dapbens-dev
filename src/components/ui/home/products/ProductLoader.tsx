import { getAllProducts } from './productActions'
import ProductList from './ProductList'

const ProductLoader = async () => {
	const products = await getAllProducts()
	return <ProductList products={products} />
}

export default ProductLoader
