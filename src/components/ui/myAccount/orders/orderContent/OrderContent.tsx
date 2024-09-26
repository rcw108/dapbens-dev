'use client'

import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { SingleOrder } from '../../customer.interface'
import { getCustomerOrders } from '../../customersActions'
import styles from './OrderContent.module.scss'
const OrderContent: FC = () => {
	const [userOrders, setUserOrders] = useState<SingleOrder[] | []>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const user = useUser()

	useEffect(() => {
		const fetchUserOrders = async (id: number) => {
			setLoading(true)
			const result = await getCustomerOrders(id)
			if (result.success) {
				setUserOrders(result.data)
			} else {
				setError(result.error?.message || 'Failed to fetch orders')
			}
			setLoading(false)
		}

		if (user) fetchUserOrders(Number(user.ID))
	}, [user])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	console.log(userOrders)

	const orderTotal = (order: SingleOrder) => {
		let totalCount = 0

		order.line_items.forEach(item => {
			totalCount += item.quantity
		})

		return totalCount
	}

	return (
		<div className={styles.table}>
			<div className={styles.tableHead}>
				<h6 className={styles.order}>Order</h6>
				<h6 className={styles.date}>Date</h6>
				<h6 className={styles.status}>Status</h6>
				<h6 className={styles.total}>Total</h6>
				<h6 className={styles.action}>Actions</h6>
			</div>
			{userOrders &&
				userOrders.map((order: any, index: number) => (
					<div className={styles.tableBodyItem} key={order.id}>
						<Link
							href={`/my-account/view-order/${order.id}`}
							className={styles.order}
						>
							#{order.id}
						</Link>
						<h6 className={styles.date}>
							{new Date(order.date_created).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</h6>
						<h6 className={styles.status}>{order.status}</h6>
						<h6 className={styles.total}>
							${order.total} for {orderTotal(order)}{' '}
							{orderTotal(order) > 1 ? 'items' : 'item'}
						</h6>
						<div className={styles.action}>
							{order.status === 'completed' ? (
								<Link
									href={`/my-account/view-order/${order.id}`}
									className={styles.view}
								>
									View
								</Link>
							) : order.status === 'canceled' ? (
								<Link
									href={`/my-account/view-order/${order.id}`}
									className={styles.view}
								>
									View
								</Link>
							) : order.status === 'failed' ? (
								<>
									<Link
										href={`/my-account/order-pay/${order.id}`}
										className={styles.view}
									>
										Pay
									</Link>
									<Link
										href={`/my-account/view-order/${order.id}`}
										className={styles.view}
									>
										View
									</Link>
									<div className={styles.view}>Cancel</div>
								</>
							) : (
								<Link
									href={`/my-account/view-order/${order.id}`}
									className={styles.view}
								>
									View
								</Link>
							)}
						</div>
					</div>
				))}
		</div>
	)
}

export default OrderContent
