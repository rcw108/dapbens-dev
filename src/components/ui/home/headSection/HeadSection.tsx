'use client'

import Image from 'next/image'
import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import ReactHtmlParser from 'react-html-parser'
import Button from '../../button/Button'
import Description from '../../headings/Description'
import Heading from '../../headings/Heading'
import styles from './HeadSection.module.scss'
import SingleAdvantage from './advantage/SingleAdvantage'
import { HeadSectionData } from './headSection.interface'
import MarqueeItem from './marqueeItem/MarqueeItem'

const HeadSection: FC<HeadSectionData> = ({
	hero_section_title,
	advantages,
	button_link,
	background_image,
	move_line_background_image,
	move_line_content,
	right_image,
	start_image,
	start_text
}) => {
	return (
		<section className={styles.head}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${background_image})` }}
				>
					<div className={styles.wrapper}>
						<div className={styles.left}>
							{start_image || start_text ? (
								<div className={styles.star}>
									{start_image && typeof start_image === 'string' && (
										<Image
											src={start_image}
											alt='rating'
											width={88}
											height={16}
											draggable={false}
										/>
									)}
									{start_text && (
										<Description title={ReactHtmlParser(start_text)} />
									)}
								</div>
							) : null}
							{hero_section_title && (
								<Heading
									className={styles.title}
									title={ReactHtmlParser(hero_section_title)}
								/>
							)}
							{advantages &&
								advantages.map((advantage, index) => {
									return (
										<SingleAdvantage
											icon={advantage.icon}
											text={advantage.text}
											key={index}
										/>
									)
								})}
							<div className={styles.btn}>
								<Button
									target={button_link.target}
									link={button_link.url}
									text={button_link.title}
								/>
							</div>
						</div>
						<div className={styles.right}>
							{right_image && typeof right_image === 'string' && (
								<Image
									src={right_image}
									alt='background'
									fill
									draggable={false}
								/>
							)}
						</div>
					</div>
					<div
						className={styles.marquee}
						style={{ backgroundImage: `url(${move_line_background_image})` }}
					>
						{move_line_content && (
							<Marquee speed={100}>
								{move_line_content.map((item, index) => {
									return <MarqueeItem key={index} {...item} />
								})}
							</Marquee>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeadSection
