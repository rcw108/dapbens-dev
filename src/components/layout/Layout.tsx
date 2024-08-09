'use client'

import { FC, PropsWithChildren } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	// const { getAllProducts } = useActions()

	// useEffect(() => {
	// 	getAllProducts()
	// 	console.log('layout')
	// }, [])

	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
