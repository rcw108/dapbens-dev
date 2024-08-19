import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

export const lowToHigh = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return +a.price - +b.price
	})
	return sortedProducts
}

export const highToLow = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return +b.price - +a.price
	})

	return sortedProducts
}

export const bestSelling = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return b.total_sales - a.total_sales
	})

	return sortedProducts
}

export const latestCreated = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return (
			new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
		)
	})
	return sortedProducts
}

export const averageRating = (products: WooCommerceSingleProduct[]) => {
	const sortedProducts = [...products].sort((a, b) => {
		return +b.average_rating - +a.average_rating
	})
	return sortedProducts
}
