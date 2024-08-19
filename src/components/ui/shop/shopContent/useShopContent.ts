import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import {
	averageRating,
	bestSelling,
	highToLow,
	latestCreated,
	lowToHigh
} from '@/utils/sortBy'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useShopContent = () => {
	const [products, setProducts] = useState<WooCommerceSingleProduct[]>([])
	const [sortBy, setSortBy] = useState('Default Sorting')
	const [availableTags, setAvailableTags] = useState<
		'In Stock' | 'Out of Stock'
	>('In Stock')
	const [selectCategory, setSelectCategory] = useState('')
	const [selectTag, setSelectTag] = useState('')
	const [sortedProducts, setSortedProducts] =
		useState<WooCommerceSingleProduct[]>(products)

	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const sortProducts = useCallback(
		(productsToSort: WooCommerceSingleProduct[], sortType: string) => {
			switch (sortType) {
				case 'Low to High':
					return lowToHigh(productsToSort)
				case 'High to Low':
					return highToLow(productsToSort)
				case 'Best Selling':
					return bestSelling(productsToSort)
				case 'Latest Created':
					return latestCreated(productsToSort)
				case 'Average Rating':
					return averageRating(productsToSort)
				default:
					return productsToSort
			}
		},
		[products]
	)

	const handleSortBy = useCallback(
		(value: string) => {
			setSortBy(value)
			router.push(pathname + '?' + createQueryString('sort', value), {
				scroll: false
			})
			setSortedProducts(prevProducts => sortProducts(prevProducts, value))
		},
		[pathname, router, createQueryString, sortProducts, products]
	)

	useEffect(() => {
		const sort = searchParams.get('sort')
		if (sort) {
			setSortBy(sort)
			setSortedProducts(prevProducts => sortProducts(prevProducts, sort))
		}
	}, [searchParams, sortProducts])

	useEffect(() => {
		setSortedProducts(prevProducts => sortProducts(prevProducts, sortBy))
	}, [products, sortProducts, sortBy])

	return {
		handleSortBy,
		sortBy,
		availableTags,
		setAvailableTags,
		selectCategory,
		setSelectCategory,
		selectTag,
		setSelectTag,
		sortedProducts,
		setProducts,
		setSortedProducts,
		defaultProducts: products,
		createQueryString
	}
}
