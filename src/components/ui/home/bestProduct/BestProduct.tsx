import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Button from '../../button/Button'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import { IBestProduct } from './bestProduct.interface'
import styles from './BestProduct.module.scss'

const BestProduct: FC<IBestProduct> = ({
	bg_bp,
	img_bp,
	link_bp,
	running_bg,
	running_text,
	star_img_bp,
	star_text_bp,
	text_bp,
	title_bp
}) => {
	return (
		<section className={styles.best}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${bg_bp})` }}
				>
					{/* Marquee */}
					<div className={styles.wrapper}>
						<div className={styles.left}>
							<div className={styles.img}></div>
						</div>
						<div className={styles.right}>
							<div className={styles.rate}>
								<Image
									src={star_img_bp}
									alt={star_text_bp}
									width={88}
									height={16}
								/>
								<Description title={ReactHtmlParser(star_text_bp)} />
							</div>
							<SubHeading title={ReactHtmlParser(title_bp)} />
							<Description title={ReactHtmlParser(text_bp)} />
							<div className={styles.btns}>
								<Button
									link={link_bp.url}
									target={link_bp.target}
									text={link_bp.title}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BestProduct
