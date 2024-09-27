'use client'

import SmallHeading from '@/components/ui/headings/SmallHeading'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { SingleCustomer } from '../../customer.interface'
import { getCustomerById } from '../../customersActions'
import styles from './EditAddressesContent.module.scss'
const EditAddressesContent: FC = () => {
	const [customer, setCustomer] = useState<SingleCustomer | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const user = useUser()

	useEffect(() => {
		const fetchUserOrders = async (id: number) => {
			setLoading(true)
			const result = await getCustomerById(id)
			if (result.success) {
				setCustomer(result.data)
			} else {
				setError(result.error?.message || 'An unexpected error occurred')
			}
			setLoading(false)
		}

		if (user) fetchUserOrders(Number(user.ID))
	}, [user])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error</div>

	if (customer === null) return <div>No customer found</div>

	return (
		<div className={styles.customerAddress}>
			<SmallHeading
				title={
					'The following addresses will be used on the checkout page by default.'
				}
			/>
			<div className={styles.wrap}>
				<div className={styles.billing}>
					<div className={styles.top}>
						<SmallHeading title={'Billing address'} />
						<Link
							href={'/my-account/edit-address/billing'}
							className={styles.edit}
						>
							Edit Billing address{' '}
						</Link>
					</div>
					<div className={styles.address}>
						<h6>
							{customer?.billing?.first_name} {customer?.billing?.last_name}
						</h6>
						<h6>{customer?.billing?.company}</h6>
					</div>
				</div>
				<div className={styles.shipping}>
					<div className={styles.top}>
						<SmallHeading title={'Shipping address'} />
						<Link
							href={'/my-account/edit-address/shipping'}
							className={styles.edit}
						>
							Edit Shipping address{' '}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditAddressesContent
