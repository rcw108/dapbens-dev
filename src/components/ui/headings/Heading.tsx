import { FC, JSXElementConstructor, ReactElement } from 'react'

interface IHeading {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const Heading: FC<IHeading> = ({ title, className }) => {
	return <h1 className={className}>{title}</h1>
}

export default Heading
