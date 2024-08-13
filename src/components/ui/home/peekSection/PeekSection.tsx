import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import styles from './PeekSection.module.scss'
import SliderComponent from './sliderComponent/SliderComponent'

interface Peek {
	title: string
	description: string
	tabFirst: string
	tabSecond: string
}

const PeekSection: FC<Peek> = ({ description, tabFirst, tabSecond, title }) => {
	return (
		<section className={styles.peek}>
			<div className={styles.top}>
				<SubHeading className='text-center' title={ReactHtmlParser(title)} />
				<Description className='text-center' title={description} />
			</div>
			<SliderComponent />
		</section>
	)
}

export default PeekSection
