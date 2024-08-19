import Description from '@/components/ui/headings/Description'
import { ReviewRepeater } from '@/types/shopPage.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import stylesReviewCard from '../../../home/reviewsSection/reviewCard/ReviewCard.module.scss'
import styles from './ReviewShopCard.module.scss'
const ReviewShopCard: FC<ReviewRepeater> = ({ author, text, start_image }) => {
	return (
		<div className={stylesReviewCard.review}>
			<div className={stylesReviewCard.quote}></div>
			<div className={stylesReviewCard.rate}>
				<Image src={start_image} alt='star' width={88} height={18} />
			</div>
			<Description
				className={clsx(stylesReviewCard.text, styles.text)}
				title={ReactHtmlParser(text)}
			/>
			<h6 className={stylesReviewCard.name}>{author}</h6>
		</div>
	)
}

export default ReviewShopCard