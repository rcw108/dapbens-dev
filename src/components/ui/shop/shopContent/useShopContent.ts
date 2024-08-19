import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import {
	averageRating,
	bestSelling,
	filterByCategory,
	filterByTag,
	getTotalAvailableProducts,
	highToLow,
	latestCreated,
	lowToHigh,
	sortAvailable
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
	const [stockStatus, setStockStatus] = useState<{
		stock: number
		outOfStock: number
	}>()
	const [availabilityTab, setAvailabilityTab] = useState(true)
	const [availabilityActive, setAvailabilityActive] = useState<'stock' | 'out'>(
		'stock'
	)
	const [categiriesTab, setCategiriesTab] = useState(true)
	const [categoriesActive, setCategoriesActive] = useState<string>('')
	const [tagTab, setTagTab] = useState(true)
	const [tagActive, setTagActive] = useState<string>('')

	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			if (value) {
				params.set(name, value)
			} else {
				params.delete(name)
			}
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

	const handleSortAvailability = useCallback(
		(value: 'stock' | 'out') => {
			setAvailabilityActive(value)

			const valueToFilter = value === 'stock' ? 'instock' : 'outofstock'

			router.push(pathname + '?' + createQueryString('availability', value), {
				scroll: false
			})
			setSortedProducts(sortAvailable(sortedProducts, valueToFilter))
		},
		[pathname, router, createQueryString, products]
	)

	const handleSortCategory = useCallback(
		(value: string) => {
			setSelectCategory(value)
			const updatedQuery = createQueryString('category', value)
			router.push(pathname + '?' + updatedQuery, { scroll: false })
			setSortedProducts(filterByCategory(sortedProducts, value))
		},
		[pathname, router, createQueryString, sortedProducts]
	)

	const handleSortTag = useCallback(
		(value: string) => {
			setSelectTag(value)
			const updatedQuery = createQueryString('tag', value)
			router.push(pathname + '?' + updatedQuery, { scroll: false })
			setSortedProducts(filterByTag(sortedProducts, value))
		},
		[pathname, router, createQueryString, sortedProducts]
	)

	useEffect(() => {
		handleSortAvailability(availabilityActive)
	}, [availabilityActive])

	useEffect(() => {
		handleSortCategory(categoriesActive)
	}, [categoriesActive])

	useEffect(() => {
		handleSortTag(tagActive)
	}, [tagActive])

	useEffect(() => {
		const sort = searchParams.get('sort')
		const availability = searchParams.get('availability') as 'stock' | 'out'
		const valueToFilter = availability === 'stock' ? 'instock' : 'outofstock'
		const category = searchParams.get('category')
		const tags = searchParams.get('tag')

		if (sort) {
			setSortBy(sort)
			setSortedProducts(prevProducts => sortProducts(prevProducts, sort))
		}

		if (availability) {
			setAvailabilityActive(availability)
			setSortedProducts(prevProducts =>
				sortAvailable(prevProducts, valueToFilter)
			)
		}

		if (category) {
			setCategoriesActive(category)
			setSortedProducts(prevProducts =>
				filterByCategory(prevProducts, category)
			)
		}

		if (tags) {
			setTagActive(tags)
			setSortedProducts(prevProducts => filterByTag(prevProducts, tags))
		}
	}, [searchParams, sortProducts])

	useEffect(() => {
		setSortedProducts(prevProducts => sortProducts(prevProducts, sortBy))
	}, [products, sortProducts, sortBy])

	useEffect(() => {
		setStockStatus(getTotalAvailableProducts(products))
	}, [products])

	const handleReset = () => {
		router.push(pathname, { scroll: false })
		setSortBy('Default Sorting')
		setSelectCategory('')
		setSelectTag('')
		setAvailabilityActive('stock')
		setCategoriesActive('')
		setTagActive('')
	}

	return {
		handleSortBy,
		handleSortAvailability,
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
		createQueryString,
		stockStatus,
		handleReset,
		availabilityTab,
		setAvailabilityTab,
		availabilityActive,
		setAvailabilityActive,
		categiriesTab,
		setCategiriesTab,
		categoriesActive,
		setCategoriesActive,
		tagTab,
		setTagTab,
		tagActive,
		setTagActive
	}
}
