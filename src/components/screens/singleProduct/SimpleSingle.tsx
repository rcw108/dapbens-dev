'use client'

import DifferenceSection from '@/components/ui/home/differenceSection/DifferenceSection'
import FaqSection from '@/components/ui/home/faqSection/FaqSection'
import Steps from '@/components/ui/home/steps/Steps'
import MarqueeLineSection from '@/components/ui/shop/marqueeLineSection/MarqueeLineSection'
import QATest from '@/components/ui/singleProducts/singleTemplate/qATest/QATest'
import { useActions } from '@/hooks/useActions'
import { useGetAllSingleProducts } from '@/hooks/useGetAllSingleProducts'
import { useProducts } from '@/hooks/useProducts'
import { usePushCookieUserCart } from '@/hooks/usePushCookieUserCart'
import { SimpleSingle } from '@/types/singleTemplates/simpleSingle.interface'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC, useEffect } from 'react'
import SimpleCard from '../../ui/singleProducts/simpleCard/SimpleCard'
import SingleHeader from '../../ui/singleProducts/singleHeader/SingleHeader'
import styles from './SingleStyles.module.scss'
interface ISimpleSingle {
	data: WooCommerceSingleProduct
	template: SimpleSingle
}

const SimpleSinglePage: FC<ISimpleSingle> = ({ data, template }) => {
	usePushCookieUserCart()

	const { pushAllProducts } = useActions()
	const { products: allProducts } = useProducts()

	const { products } = useGetAllSingleProducts()

	useEffect(() => {
		if (allProducts) return
		pushAllProducts(products)
	}, [products])

	return (
		<main>
			<SingleHeader acf={template.acf} product={data}>
				<SimpleCard {...data} product={data} />
			</SingleHeader>
			<Steps
				link_st={{ url: '', target: '', title: '' }}
				st_bg=''
				steps_st={template.acf.single_steps}
				text_st={template.acf.subtitle_sin_steps}
				title_st={template.acf.title_sin_steps}
				className={styles.singleSteps}
				classNameTitle={styles.singleStepsTitle}
				classNameDescr={styles.singleStepsDescr}
				classNameStep={styles.singleStepsStep}
			/>
			<QATest
				background_image_qual={template.acf.background_image_qual}
				button_qual={template.acf.button_qual}
				content_qual={template.acf.content_qual}
				subtitle_qual={template.acf.subtitle_qual}
				title_qual={template.acf.title_qual}
			/>
			<DifferenceSection
				blocks_d={template.acf.content_diff}
				link_d={template.acf.button_diff}
				text_d={template.acf.subtitle_diff}
				title_d={template.acf.title_diff}
			/>
			<MarqueeLineSection
				marquee_line_bg={template.acf.move_section_background}
				marquee_line_repeater={template.acf.content_move_s}
			/>
			<FaqSection
				bg_f={template.acf.backgoround_faq}
				faqs_f={template.acf.tabs_faq}
				text_f={template.acf.subtitle_faq}
				title_f={template.acf.title_faq}
			/>
		</main>
	)
}

export default SimpleSinglePage
