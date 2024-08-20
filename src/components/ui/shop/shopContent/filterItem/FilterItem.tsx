import { Category, Tag } from '@/store/products/product.interface'
import clsx from 'clsx'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from '../ShopContent.module.scss'

interface IFilterItem {
	tab: boolean
	itemsArray: Category[] | Tag[]
	handler: (value: string) => void
	active: string
}

const FilterItem: FC<IFilterItem> = ({ active, handler, itemsArray, tab }) => {
	return (
		<div className={clsx(styles.choice, tab && styles.active)}>
			{itemsArray &&
				itemsArray.map(category => {
					if (category.count === 0) return null

					return (
						<div
							key={category.id}
							onClick={() => handler(category.name)}
							className={clsx(styles.item, {
								[styles.active]: active === category.name
							})}
						>
							<div
								className={clsx(styles.circle, {
									[styles.active]: active === category.name
								})}
							></div>
							<h5>{ReactHtmlParser(category.name)}</h5>
						</div>
					)
				})}
		</div>
	)
}

export default FilterItem
