import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SmallHeading from '../../headings/SmallHeading'
import SubHeading from '../../headings/SubHeading'
import { SaveSectionProps } from './saveSection.interface'
import styles from './SaveSection.module.scss'
const SaveSection: FC<SaveSectionProps> = ({
	bg_img_left_sv,
	bg_img_right_sv,
	star_img_sv,
	star_text_sv,
	sub_title_sv,
	text_sv,
	title_sv
}) => {
	return (
		<section className={styles.save}>
			<div className={styles.box}>
				<Image
					src={bg_img_left_sv}
					width={273}
					height={477}
					alt='bg_img_left_sv'
					unoptimized
				/>
				<div className={styles.center}>
					<div className={styles.rate}>
						<Image src={star_img_sv} alt='star_img_sv' width={88} height={16} />
						<Description
							className={styles.rateTitle}
							title={ReactHtmlParser(star_text_sv)}
						/>
					</div>
					<SmallHeading
						className={styles.subtitle}
						title={ReactHtmlParser(sub_title_sv)}
					/>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_sv)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_sv)}
					/>
				</div>
				<Image
					src={bg_img_right_sv}
					width={273}
					height={477}
					alt='bg_img_right_sv'
				/>
			</div>
		</section>
	)
}

export default SaveSection
