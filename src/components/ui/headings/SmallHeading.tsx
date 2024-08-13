import { FC, JSXElementConstructor, ReactElement } from 'react'

interface ISmallHeading {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const SmallHeading: FC<ISmallHeading> = ({ title, className }) => {
	return <h3 className={className}>{title}</h3>
}

export default SmallHeading
