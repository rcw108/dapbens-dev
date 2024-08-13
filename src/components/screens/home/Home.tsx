import HeadSection from '@/components/ui/home/headSection/HeadSection'
import PeekSection from '@/components/ui/home/peekSection/PeekSection'
import Puff from '@/components/ui/home/puff/Puff'
import Steps from '@/components/ui/home/steps/Steps'
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
				tabFirst={data.acf.tab1_pr}
				tabSecond={data.acf.tab2_pr}
			/>
			<PeekSection
				title={data.acf.title_pr}
				description={data.acf.text_pr}
				tabFirst={data.acf.tab1_pr}
				tabSecond={data.acf.tab2_pr}
			/>
			<Steps
				link_st={data.acf.link_st}
				st_bg={data.acf.st_bg}
				steps_st={data.acf.steps_st}
				text_st={data.acf.text_st}
				title_st={data.acf.title_st}
			/>
			<Puff
				img_hf={data.acf.img_hf}
				text_hf={data.acf.text_hf}
				title_hf={data.acf.title_hf}
				star_img_hf={data.acf.star_img_hf}
				star_text_={data.acf.star_text_}
			/>
		</main>
	)
}

export default Home
