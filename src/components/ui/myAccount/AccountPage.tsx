'use client'

import { useUser } from '@/hooks/useUser'
import { MyAccountLayout } from '@/types/myAccount.interface'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './AccountPage.module.scss'
import NavSidebar from './navSidebar/NavSidebar'
const DynamicMainAuthContent = dynamic(
	() => import('./mainAuthContent/MainAuthContent'),
	{ ssr: false }
)
const DynamicDashboard = dynamic(() => import('./dashboard/Dashboard'), {
	ssr: false
})

const AccountPage: FC<{ data: MyAccountLayout }> = ({ data }) => {
	const { user } = useUser()

	return (
		<>
			<section className={styles.wrap}>
				{user !== null ? (
					<div className={styles.profileWrapper}>
						<NavSidebar />
						<DynamicDashboard />
					</div>
				) : (
					<DynamicMainAuthContent />
				)}
			</section>
		</>
	)
}

export default AccountPage
