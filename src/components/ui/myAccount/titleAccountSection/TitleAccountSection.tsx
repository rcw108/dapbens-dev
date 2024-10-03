'use client'

import clsx from 'clsx'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Heading from '../../headings/Heading'
import styles from './TitleAccountSection.module.scss'

interface ITitleAccountSection {
	title: string
	background_image: string
	className?: string
}

const TitleAccountSection: FC<ITitleAccountSection> = ({
	background_image,
	title,
	className
}) => {
	return (
		<section
			className={styles.title}
			style={{ backgroundImage: `url(${background_image})` }}
		>
			<div className={styles.wrapper}>
				<Heading
					className={clsx(styles.title, className)}
					title={ReactHtmlParser(title)}
				/>
			</div>
		</section>
	)
}

export default TitleAccountSection
