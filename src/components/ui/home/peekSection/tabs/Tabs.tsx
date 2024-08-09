import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { FC, Suspense } from 'react'
import ProductLoader from '../../products/ProductLoader'

const Tabs: FC = () => {
	return (
		<>
			<Suspense
				fallback={<SkeletonLoader count={5} width={'20%'} height={600} />}
			>
				<ProductLoader />
			</Suspense>
		</>
	)
}

export default Tabs
