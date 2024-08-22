import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import Cart from './cart/Cart'
import styles from './Header.module.scss'
import Logotype from './logotype/Logotype'
import Menu from './menu/Menu'
import TopBar from './topbar/TopBar'

const Header: FC = () => {
	return (
		<header>
			<TopBar />
			<div className={clsx('header-line', styles.main)}>
				<Logotype />
				<Menu />
				<div className={styles.details}>
					<div className={clsx('cursor-pointer', styles.search)}>
						<Image src='/search.svg' alt='search' width={26} height={26} />
					</div>
					<div className={clsx('cursor-pointer', styles.profile)}>
						<Image src='/user.svg' alt='profile' width={26} height={26} />
					</div>
					<Cart />
				</div>
			</div>
		</header>
	)
}

export default Header
