import { FC, JSXElementConstructor, ReactElement } from 'react'

interface ISubHeading {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const SubHeading: FC<ISubHeading> = ({ title, className }) => {
	return <h2 className={className}>{title}</h2>
}

export default SubHeading
