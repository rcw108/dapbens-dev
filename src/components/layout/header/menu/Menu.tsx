import Link from 'next/link'
import { FC } from 'react'

const Menu: FC = () => {
	return (
		<nav>
			<ul className='flex gap-6'>
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
	)
}

export default Menu
