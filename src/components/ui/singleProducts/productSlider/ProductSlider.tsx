'use client'

import { Image as WooImages } from '@/types/wooCommerce.interface'
import Image from 'next/image'
import { FC, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './ProductSlider.module.scss'

const ProductSlider: FC<{ images: WooImages[] }> = ({ images }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

	if (images.length <= 1)
		return (
			<div className={styles.image}>
				<InnerImageZoom
					src={images[0].src}
					zoomSrc={images[0].src}
					zoomType='hover'
				/>
			</div>
		)

	return (
		<div className={styles.image}>
			<div className={styles.slid}>
				<Swiper
					className='productFirstSlider'
					navigation={true}
					modules={[FreeMode, Navigation, Thumbs]}
					thumbs={{ swiper: thumbsSwiper }}
				>
					{images.map(image => (
						<SwiperSlide key={image.id}>
							<InnerImageZoom
								src={image.src}
								zoomSrc={image.src}
								zoomType='hover'
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<Swiper
				className='thumb'
				onSwiper={setThumbsSwiper}
				spaceBetween={5}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
			>
				{images.map(image => (
					<SwiperSlide key={image.id}>
						<Image src={image.src} alt='image' width={100} height={100} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default ProductSlider
