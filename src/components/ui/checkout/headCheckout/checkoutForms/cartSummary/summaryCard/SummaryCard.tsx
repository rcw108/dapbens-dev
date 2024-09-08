import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SummaryCard.module.scss'
const SummaryCard: FC<{ product: WooCommerceSingleProduct }> = ({
	product
}) => {
	return (
		<div className={clsx(styles.item, 'sumCard')}>
			<div className={styles.left}>
				<Image
					src={product.images[0].src}
					alt={product.name}
					width={40}
					height={40}
				/>
				<SmallHeading title={product.name} className={styles.name} />
			</div>
			<div className={styles.right}>
				<Description title={ReactHtmlParser(product.price_html)} />
				<div className={styles.save}>
					<Description
						title={`You're saving ${(+product.regular_price - +product.sale_price).toFixed(2)}`}
					/>
				</div>
			</div>
		</div>
	)
}

export default SummaryCard
