import { HomeACF } from '@/types/homepage.interface'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Button from '../../button/Button'
import Description from '../../headings/Description'
import SubHeading from '../../headings/SubHeading'
import styles from './Steps.module.scss'
import SingleStep from './singleStep/SingleStep'

interface ISteps
	extends Pick<
		HomeACF,
		'st_bg' | 'title_st' | 'text_st' | 'steps_st' | 'link_st'
	> {}

const Steps: FC<ISteps> = ({ link_st, st_bg, steps_st, text_st, title_st }) => {
	return (
		<section className={styles.steps}>
			<div className='container'>
				<div
					className={styles.box}
					style={{ backgroundImage: `url(${st_bg})` }}
				>
					<SubHeading
						title={ReactHtmlParser(title_st)}
						className={styles.title}
					/>
					<Description
						className={styles.descr}
						title={ReactHtmlParser(text_st)}
					/>
					{steps_st && (
						<div className={styles.info}>
							{steps_st.map((step, index) => (
								<SingleStep key={index} {...step} />
							))}
						</div>
					)}
					<div className={styles.btns}>
						<Button
							link={link_st.url}
							target={link_st.target}
							text={link_st.title}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Steps
