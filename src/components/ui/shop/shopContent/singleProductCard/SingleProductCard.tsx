import Description from '@/components/ui/headings/Description'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleProductCard.module.scss'

const SingleProductCard: FC<WooCommerceSingleProduct> = ({
	name,
	price_html,
	images,
	slug
}) => {
	return (
		<div className={styles.card}>
			{images[0] && (
				<div className={styles.img}>
					<Image
						priority
						src={images[0].src}
						alt={name}
						width={277}
						height={277}
					/>
				</div>
			)}
			<div className={styles.content}>
				<Image
					className='mx-auto'
					src={'/stars.svg'}
					alt='stars'
					width={88}
					height={16}
				/>
				<Link href={`products/${slug}`} className={styles.title}>
					{ReactHtmlParser(name)}
				</Link>
				<Description
					className={styles.price}
					title={ReactHtmlParser(price_html)}
				/>
				<Link className={styles.btn} href={`products/${slug}`}>
					<span>SHOP NOW</span>
					<Image src={'/right.svg'} alt='right' width={24} height={24} />
				</Link>
			</div>
		</div>
	)
}

export default SingleProductCard
