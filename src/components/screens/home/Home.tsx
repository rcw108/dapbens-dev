'use client'

import HeadSection from '@/components/ui/home/headSection/HeadSection'
import { useProducts } from '@/hooks/useProducts'
import { IHome } from '@/types/homepage.interface'
import { FC } from 'react'
import styles from './Home.module.scss'

const Home: FC<{ data: IHome }> = ({ data }) => {
	const { products, isLoading } = useProducts()
	console.log(data.acf)
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
		</main>
	)
}

export default Home
