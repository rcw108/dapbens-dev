import { FC, PropsWithChildren } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
