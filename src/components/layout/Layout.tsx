import { useActions } from '@/hooks/useActions'
import { FC, PropsWithChildren, useEffect } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { getAllProducts } = useActions()

	useEffect(() => {
		getAllProducts()
		console.log('layout')
	}, [])

	console.log('layout f')

	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
