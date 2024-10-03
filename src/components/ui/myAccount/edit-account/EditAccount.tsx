import dynamic from 'next/dynamic'
import { FC } from 'react'
import stylesBoard from '../AccountPage.module.scss'
import EditAccountContent from './editAccountContent/EditAccountContent'

const DynamicNavSidebar = dynamic(() => import('../navSidebar/NavSidebar'), {
	ssr: false
})

const EditAccount: FC = () => {
	return (
		<div className={stylesBoard.wrap}>
			<div className={stylesBoard.profileWrapper}>
				<DynamicNavSidebar />
				<EditAccountContent />
			</div>
		</div>
	)
}

export default EditAccount
