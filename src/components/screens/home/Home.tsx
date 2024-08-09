import HeadSection from '@/components/ui/home/headSection/HeadSection'
import PeekSection from '@/components/ui/home/peekSection/PeekSection'
import { IHome } from '@/types/homepage.interface'
import { FC } from 'react'
import styles from './Home.module.scss'

const Home: FC<{ data: IHome }> = ({ data }) => {
	return (
		<main className={styles.home}>
			<HeadSection
				advantages={data.acf.advantages}
				hero_section_title={data.acf.hero_section_title}
				background_image={data.acf.background_image}
				start_image={data.acf.start_image}
				start_text={data.acf.start_text}
				button_link={data.acf.button_link}
				right_image={data.acf.right_image}
				move_line_background_image={data.acf.move_line_background_image}
				move_line_content={data.acf.move_line_content}
			/>
			<PeekSection
				title={data.acf.title_pr}
				description={data.acf.text_pr}
				tabFirst={data.acf.tab1_pr}
				tabSecond={data.acf.tab2_pr}
			/>
		</main>
	)
}

export default Home
