'use client'

import Description from '@/components/ui/headings/Description'
import SmallHeading from '@/components/ui/headings/SmallHeading'
import { SingleQA } from '@/types/faq.interface'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './SingleFaq.module.scss'
const SingleFaq: FC<SingleQA> = ({ answer, question }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={styles.item} onClick={() => setOpen(!open)}>
			<div className={styles.top}>
				<SmallHeading
					className='text-black'
					title={ReactHtmlParser(question)}
				/>
				<Image
					src='/caret-right-solid.svg'
					alt='caret'
					width={7}
					height={18}
					style={{ transition: 'all 0.3s ease-in-out' }}
					className={clsx({ [styles.rotate]: open })}
				/>
			</div>
			<div className={clsx(styles.content, { [styles.active]: open })}>
				<div style={{ minHeight: 0 }}>
					<Description className='text-black' title={ReactHtmlParser(answer)} />
				</div>
			</div>
		</div>
	)
}

export default SingleFaq
