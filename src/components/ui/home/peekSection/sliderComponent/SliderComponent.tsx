import { FC, Suspense } from 'react'
import styles from '../PeekSection.module.scss'
import Tabs from '../tabs/Tabs'

const SliderComponent: FC = () => {
	return (
		<div className={styles.box}>
			<Suspense>
				<Tabs />
			</Suspense>
		</div>
	)
}

export default SliderComponent
