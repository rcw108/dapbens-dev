import Description from '@/components/ui/headings/Description'
import SubHeading from '@/components/ui/headings/SubHeading'
import SliderComponent from '@/components/ui/home/products/SliderComponent'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './AlsoLove.module.scss'
interface IAlsoLove {
	products: WooCommerceSingleProduct[]
	title: string
	description: string
	isLoading: boolean
}

const AlsoLove: FC<IAlsoLove> = ({
	products,
	description,
	title,
	isLoading
}) => {
	const firstCategoryList = products
		.sort((a, b) => {
			return +a.price - +b.price
		})
		.filter(product =>
			product.categories.some(category => category.slug === '510-cartridges')
		)
		.slice(0, 7)

	if (isLoading) {
		return <SkeletonLoader count={1} width={'100%'} height={400} />
	}

	return (
		<section className={styles.also}>
			<div className={styles.box}>
				<SubHeading className={styles.title} title={ReactHtmlParser(title)} />
				<Description
					className={styles.descr}
					title={ReactHtmlParser(description)}
				/>
				<SliderComponent list={firstCategoryList} />
			</div>
		</section>
	)
}

export default AlsoLove
