import { HomeACF } from '@/types/homepage.interface'
import { FC } from 'react'
import { Swiper } from 'swiper/react'
import ReviewCard from './reviewCard/ReviewCard'
import styles from './ReviewsSection.module.scss'

interface Review extends Pick<HomeACF, 'title_r' | 'text_r' | 'reviews_r'> {}

const ReviewsSection: FC<Review> = ({ reviews_r, text_r, title_r }) => {
	return (
		<section className={styles.reviews}>
			<div className={styles.box}>
				{/* <SubHeading />
				<Description /> */}

				<div className={styles.slider}>
					<Swiper>
						{reviews_r &&
							reviews_r.map((item, index) => (
								<ReviewCard key={index} {...item} />
							))}
					</Swiper>
				</div>
			</div>
		</section>
	)
}

export default ReviewsSection
