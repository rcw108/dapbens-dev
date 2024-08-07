import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Header.module.scss'
import TopBar from './topbar/TopBar'

const Header: FC = () => {
	return (
		<header>
			<TopBar />
			<div className={clsx('header-line', styles.main)}>
				<div className={styles.logo}>Dabpens</div>
				<nav>
					<ul>
						<li>
							<Link href='/'>Home</Link>
						</li>
						<li>Shop</li>
						<li>My Account</li>
						<li>
							<Link href='/faq'>FAQ</Link>
						</li>
						<li>Contact</li>
						<li>Testing</li>
						<li>Reviews</li>
					</ul>
				</nav>
				<div className={styles.details}>
					<div className={styles.search}></div>
					<div className={styles.account}></div>
					<div className={styles.cart}></div>
				</div>
			</div>
		</header>
	)
}

export default Header
