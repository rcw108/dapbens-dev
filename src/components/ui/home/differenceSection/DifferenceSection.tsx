import { HomeACF } from '@/types/homepage.interface'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Button from '../../button/Button'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import styles from './DifferenceSection.module.scss'
import SingleDifference from './singleDifference/SingleDifference'

interface Difference
	extends Pick<HomeACF, 'title_d' | 'text_d' | 'blocks_d' | 'link_d'> {}

const DifferenceSection: FC<Difference> = ({
	blocks_d,
	link_d,
	text_d,
	title_d
}) => {
	return (
		<section className={styles.difference}>
			<div className='container'>
				<div className={styles.wrapper}>
					<SubHeading
						className={styles.title}
						title={ReactHtmlParser(title_d)}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_d)}
					/>
					<div className={styles.box}>
						{blocks_d &&
							blocks_d.map((block, index) => (
								<SingleDifference key={index} {...block} />
							))}
					</div>
					<div className={styles.btns}>
						<Button
							link={link_d.url}
							target={link_d.target}
							text={link_d.title}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DifferenceSection
