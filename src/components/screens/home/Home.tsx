'use client'

import BestProduct from '@/components/ui/home/bestProduct/BestProduct'
import DifferenceSection from '@/components/ui/home/differenceSection/DifferenceSection'
import FlavorsSection from '@/components/ui/home/flavorsSection/FlavorsSection'
import HeadSection from '@/components/ui/home/headSection/HeadSection'
import PeekSection from '@/components/ui/home/peekSection/PeekSection'
import Puff from '@/components/ui/home/puff/Puff'
import Steps from '@/components/ui/home/steps/Steps'
import { useActions } from '@/hooks/useActions'
import { useProducts } from '@/hooks/useProducts'
import { IHome } from '@/types/homepage.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect } from 'react'
import styles from './Home.module.scss'

const Home: FC<{ data: IHome; products: WooCommerceSingleProduct[] }> = ({
	data,
	products
}) => {
	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [])

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
				popularCategories={[data.acf.tab1_pr, data.acf.tab2_pr]}
				products={products}
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
			<FlavorsSection
				bg_fl={data.acf.bg_fl}
				img_fl={data.acf.img_fl}
				link_fl={data.acf.link_fl}
				name_review_fl={data.acf.name_review_fl}
				star_img_fl={data.acf.star_img_fl}
				text_fl={data.acf.text_fl}
				text_review_fl={data.acf.text_review_fl}
				title_fl={data.acf.title_fl}
				title_review_fl={data.acf.title_review_fl}
			/>
			<DifferenceSection
				blocks_d={data.acf.blocks_d}
				link_d={data.acf.link_d}
				text_d={data.acf.text_d}
				title_d={data.acf.title_d}
			/>
			<BestProduct
				bg_bp={data.acf.bg_bp}
				img_bp={data.acf.img_bp}
				link_bp={data.acf.link_bp}
				running_bg={data.acf.running_bg}
				running_text={data.acf.running_text}
				star_img_bp={data.acf.star_img_bp}
				star_text_bp={data.acf.star_text_bp}
				text_bp={data.acf.text_bp}
				title_bp={data.acf.title_bp}
			/>
		</main>
	)
}

export default Home
