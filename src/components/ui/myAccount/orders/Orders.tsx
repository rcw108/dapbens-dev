import dynamic from 'next/dynamic'
import { FC } from 'react'
import stylesBoard from '../AccountPage.module.scss'
import OrderContent from './orderContent/OrderContent'
const DynamicNavSidebar = dynamic(() => import('../navSidebar/NavSidebar'), {
	ssr: false
})

const Orders: FC = () => {
	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<OrderContent />
			</div>
		</div>
	)
}

export default Orders
