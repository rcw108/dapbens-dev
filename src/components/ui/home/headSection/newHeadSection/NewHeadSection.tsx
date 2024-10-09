import SmallHeading from '@/components/ui/headings/SmallHeading'
import { HomeACF } from '@/types/homepage.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styles from './NewHeadSection.module.scss'

interface INewHeadSection
	extends Pick<
		HomeACF,
		'hero_section_img' | 'hero_section_link' | 'move_line_content'
	> {}

const NewHeadSection: FC<INewHeadSection> = ({
	hero_section_img,
	hero_section_link,
	move_line_content
}) => {
	return (
		<section className={styles.newHero}>
			<Link href={hero_section_link.url} className={styles.img}>
				<Image src={hero_section_img} alt='Hero Section' fill />
			</Link>
			<div className={styles.line}>
				{move_line_content &&
					move_line_content.map(item => (
						<div className={styles.item} key={123 + item.icon}>
							{item.icon && typeof item.icon === 'string' && (
								<>
									<Image
										src={item.icon}
										priority
										alt='advantage'
										width={40}
										height={40}
									/>
								</>
							)}
							<SmallHeading
								className={styles.title}
								title={ReactHtmlParser(item.text)}
							/>
						</div>
					))}
			</div>
		</section>
	)
}

export default NewHeadSection
