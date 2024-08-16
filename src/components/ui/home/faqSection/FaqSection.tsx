'use client'

import { HomeACF } from '@/types/homepage.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SmallHeading from '../../headings/SmallHeading'
import SubHeading from '../../headings/SubHeading'
import styles from './FaqSection.module.scss'

interface FAQ extends Pick<HomeACF, 'title_f' | 'bg_f' | 'text_f' | 'faqs_f'> {}

const FaqSection: FC<FAQ> = ({ bg_f, faqs_f, text_f, title_f }) => {
	const [currentTab, setCurrentTab] = useState(0)

	return (
		<section className={styles.faq}>
			<div className='container'>
				<div
					className={styles.wrapper}
					style={{ backgroundImage: `url(${bg_f})` }}
				>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_f)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_f)}
					/>
					<div className={styles.box}>
						{faqs_f.map((item, index) => (
							<div
								className={clsx(
									styles.item,
									index === currentTab && styles.active
								)}
								key={index}
								onClick={() => setCurrentTab(index)}
							>
								<div className={styles.top}>
									<SmallHeading
										className={styles.tabTitle}
										title={ReactHtmlParser(item.question)}
									/>
									<div className={styles.icon}>
										{currentTab === index ? (
											<Image
												src={'/faq-minus.svg'}
												alt='faq block open/close'
												width={40}
												height={40}
											/>
										) : (
											<Image
												src={'/faq-plus.svg'}
												alt='faq block open/close'
												width={40}
												height={40}
											/>
										)}
									</div>
								</div>
								<div className={styles.bottom}>
									<div style={{ minHeight: '0' }}>
										<Description
											className={styles.text}
											title={ReactHtmlParser(item.answer)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default FaqSection
