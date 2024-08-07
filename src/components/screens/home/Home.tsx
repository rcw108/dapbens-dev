'use client'

import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { IHome } from '@/types/homepage.interface'
import { FC, useEffect } from 'react'
import styles from './Home.module.scss'

const Home: FC<{ data: IHome }> = ({ data }) => {
	const { getAllProducts } = useActions()

	useEffect(() => {
		getAllProducts()
	}, [])

	const { products, isLoading } = useProducts()

	console.log(products, isLoading)

	useEffect(() => {
		if (products !== null && isLoading === false) console.log(products)
	}, [isLoading])

	return (
		<div className={styles.home}>
			{products && products[0].in_stock === true ? (
				<h1>В наличии</h1>
			) : (
				<h1>Нет в наличии</h1>
			)}
		</div>
	)
}

export default Home
