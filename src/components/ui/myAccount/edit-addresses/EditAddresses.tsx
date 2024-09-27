import dynamic from 'next/dynamic'
import { FC } from 'react'
import stylesBoard from '../AccountPage.module.scss'
import EditAddressesContent from './editAddressesContent/EditAddressesContent'

const DynamicNavSidebar = dynamic(() => import('../navSidebar/NavSidebar'), {
	ssr: false
})

const EditAddresses: FC = () => {
	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<EditAddressesContent />
			</div>
		</div>
	)
}

export default EditAddresses
