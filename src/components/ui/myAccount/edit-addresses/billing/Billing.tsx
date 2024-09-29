import dynamic from 'next/dynamic'
import { FC } from 'react'
import stylesBoard from '../../AccountPage.module.scss'
import BillingContent from './billingContent/BillingContent'

const DynamicNavSidebar = dynamic(() => import('../../navSidebar/NavSidebar'), {
	ssr: false
})

const Billing: FC = () => {
	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<BillingContent />
			</div>
		</div>
	)
}

export default Billing
