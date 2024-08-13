import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { Step } from '@/types/homepage.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleStep.module.scss'

const SingleStep: FC<Step> = ({ img, text, title }) => {
	return (
		<div className={styles.singleStep}>
			<div className={styles.img}>
				{img && typeof img === 'string' && (
					<Image
						draggable={false}
						src={img}
						alt={title}
						width={280}
						height={280}
					/>
				)}
			</div>
			<SmallHeading className={styles.title} title={ReactHtmlParser(title)} />
			<Description className={styles.descr} title={ReactHtmlParser(text)} />
		</div>
	)
}

export default SingleStep
