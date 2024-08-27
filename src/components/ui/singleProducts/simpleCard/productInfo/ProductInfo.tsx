import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'
import { FC } from 'react'
import AdditionalInfo from './addintionalInfo/AdditionalInfo'
import styles from './ProductInfo.module.scss'
import ProductInfoItem from './productInfoItem/ProductInfoItem'

interface IProductInfo
	extends Pick<WooCommerceSingleProduct, 'acf' | 'weight' | 'dimensions'> {}

const ProductInfo: FC<IProductInfo> = ({ acf, weight, dimensions }) => {
	return (
		<div className={styles.info}>
			{acf.title_de && acf.text_de && (
				<ProductInfoItem text={acf.text_de} title={acf.title_de} />
			)}
			{acf.title_subs && acf.text_subs && (
				<ProductInfoItem text={acf.text_subs} title={acf.title_subs} />
			)}
			{weight || dimensions ? (
				<ProductInfoItem
					title='Additional Information'
					text='Additional Information'
				>
					{weight && <AdditionalInfo text={`${weight} g`} title='Weight' />}
					{dimensions && (
						<AdditionalInfo
							text={`${dimensions.length} × ${dimensions.width} × ${dimensions.height} in`}
							title='Dimensions'
						/>
					)}
				</ProductInfoItem>
			) : null}
			{acf.text_sp && acf.title_sp && (
				<ProductInfoItem text={acf.text_sp} title={acf.title_sp} />
			)}
		</div>
	)
}

export default ProductInfo
