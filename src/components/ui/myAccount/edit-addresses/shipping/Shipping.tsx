import dynamic from 'next/dynamic'
import { FC } from 'react'
import stylesBoard from '../../AccountPage.module.scss'
import ShippingContent from './shippingContent/ShippingContent'

const DynamicNavSidebar = dynamic(() => import('../../navSidebar/NavSidebar'), {
	ssr: false
})

const Shipping: FC = () => {
	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<ShippingContent />
			</div>
		</div>
	)
}

export default Shipping
