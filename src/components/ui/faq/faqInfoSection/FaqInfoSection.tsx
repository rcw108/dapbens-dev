import { FAQAcf } from '@/types/faq.interface'
import clsx from 'clsx'
import { FC } from 'react'
import SubHeading from '../../headings/SubHeading'
import styles from './FaqInfoSection.module.scss'
import SingleFaq from './singleFaq/SingleFaq'

interface IFaqInfoSection extends Pick<FAQAcf, 'faqs_fp'> {}

const FaqInfoSection: FC<IFaqInfoSection> = ({ faqs_fp }) => {
	return (
		<section className={styles.faqSection}>
			<div className='container'>
				{faqs_fp.map((faq, index) => {
					return (
						<div
							className={clsx(styles.item, styles[`faq-${index}`])}
							key={`faq-${index}`}
						>
							<SubHeading title={faq.title} />
							<div className={clsx(styles[`wrapper-${index}`])}>
								{faq['question_-_answer'].map((item, index) => {
									return (
										<SingleFaq
											key={`sft-${index}`}
											answer={item.answer}
											question={item.question}
										/>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default FaqInfoSection
