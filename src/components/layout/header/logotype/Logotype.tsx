import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Image from 'next/image'
import { FC } from 'react'
import { useTopBar } from '../topbar/useTopBar'

const Logotype: FC = () => {
	const { data, isLoading } = useTopBar()

	return (
		<>
			{isLoading ? (
				<SkeletonLoader count={1} width={200} height={35} />
			) : data ? (
				<div className='logo'>
					<Image src={data.header_logo} alt='logo' width={224} height={35} />
				</div>
			) : null}
		</>
	)
}

export default Logotype
