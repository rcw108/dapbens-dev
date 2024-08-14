import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SliderButton from '../../button/sliderButton/SliderButton'
import ProductSliderCard from './productSliderCard/ProductSliderCard'

interface SliderComponentProps {
	list: WooCommerceSingleProduct[]
}

const SliderComponent: FC<SliderComponentProps> = ({ list }) => {
	return (
		<>
			<Swiper
				modules={[Navigation, Pagination]}
				pagination={{ clickable: true }}
				slidesPerView={4}
				centeredSlides
				autoplay
				initialSlide={2}
				loop
				spaceBetween={32}
			>
				<SliderButton variant='left' />
				{list.slice(0, 6).map(product => {
					if (product.catalog_visibility === 'hidden') return
					return (
						<SwiperSlide key={product.id}>
							{({ isActive }) => {
								return (
									<ProductSliderCard slideState={isActive} product={product} />
								)
							}}
						</SwiperSlide>
					)
				})}
				<SliderButton variant='right' />
			</Swiper>
		</>
	)
}

export default SliderComponent
