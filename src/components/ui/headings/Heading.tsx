import clsx from 'clsx'
import { FC, JSXElementConstructor, ReactElement } from 'react'

interface IHeading {
	title: string | ReactElement<any, string | JSXElementConstructor<any>>[]
	className?: string
}

const Heading: FC<IHeading> = ({ title, className }) => {
	if (typeof title === 'string') {
		return <h1 className={clsx('', className)}>{title}</h1>
	} else {
		return <>{title}</>
	}
}

export default Heading
