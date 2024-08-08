import Description from '@/components/ui/headings/Description'
import { MoveLineContent } from '@/types/homepage.interface'
import Image from 'next/image'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './MarqueeItem.module.scss'

const MarqueeItem: FC<MoveLineContent> = ({ icon, text }) => {
	return (
		<div className={styles.item}>
			<div className={styles.img}>
				{icon && typeof icon === 'string' && (
					<Image draggable={false} src={icon} alt='advantage' fill />
				)}
			</div>
			<Description title={ReactHtmlParser(text)} />
		</div>
	)
}

export default MarqueeItem
