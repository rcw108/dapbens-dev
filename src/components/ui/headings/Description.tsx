import { FC, JSXElementConstructor, ReactElement } from 'react'

interface IDescription {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const Description: FC<IDescription> = ({ title, className }) => {
	if (typeof title === 'string') {
		return <p className={className}>{title}</p>
	} else {
		return <div className={className}>{title}</div>
	}
}

export default Description
