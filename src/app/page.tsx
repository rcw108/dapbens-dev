import Home from '@/components/screens/home/Home'
import { homePageUrl } from '@/configs/page.config'
import { IHome } from '@/types/homepage.interface'
import { FC } from 'react'

const homePageDataResponse = async () => {
	try {
		const data: IHome = await fetch(`${homePageUrl}?acf_format=standard`, {
			next: { revalidate: 3600 }
		}).then(res => res.json())
		return data
	} catch (error) {
		console.log(error)
	}
}

/*
	MetaData fn
*/

const HomePage: FC = async () => {
	const homeData = await homePageDataResponse()

	return <>{homeData && <Home data={homeData} />}</>
}

export default HomePage
