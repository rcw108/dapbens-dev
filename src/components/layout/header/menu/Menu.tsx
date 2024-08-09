import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Menu.module.scss'
import { useMenu } from './useMenu'
const Menu: FC = () => {
	const { data, isLoading } = useMenu()

	const headerMenu = data?.filter(item => item.name === 'Primary Menu')

	return (
		<nav className={styles.menu}>
			<ul className='flex gap-6'>
				{isLoading ? (
					<SkeletonLoader count={6} width={60} height={28} />
				) : headerMenu ? (
					headerMenu[0].fields.map(item => (
						<li key={item.title}>
							<Link href={item.url}>{item.title}</Link>
						</li>
					))
				) : null}
			</ul>
		</nav>
	)
}

export default Menu
