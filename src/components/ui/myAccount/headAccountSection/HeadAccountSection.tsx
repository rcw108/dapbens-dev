'use client'

import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import styles from './HeadAccountSection.module.scss'
interface IHeadAccountSection {
	contentLines: {
		icon: string | false
		text: string
	}[]
}

const HeadAccountSection: FC<IHeadAccountSection> = ({ contentLines }) => {
	return (
		<section className={styles.headAC}>
			<div className={styles.wrapper}>
				{contentLines.map((item, index) => (
					<div className={styles.item} key={item.text}>
						{item.icon && typeof item.icon === 'string' && (
							<Image src={item.icon} alt='advantage' width={15} height={15} />
						)}
						<Description
							className={styles.text}
							title={ReactHtmlParser(item.text)}
						/>
					</div>
				))}
			</div>
		</section>
	)
}

export default HeadAccountSection
