import dynamic from 'next/dynamic'
import { FC } from 'react'
import stylesBoard from '../AccountPage.module.scss'
import SubscriptionsContent from './subscriptionsContent/SubscriptionsContent'

const DynamicNavSidebar = dynamic(() => import('../navSidebar/NavSidebar'), {
	ssr: false
})

const Subscriptions: FC = () => {
	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<SubscriptionsContent />
			</div>
		</div>
	)
}

export default Subscriptions
