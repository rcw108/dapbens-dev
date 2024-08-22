import Cookies from 'js-cookie'

export const saveCartToCookie = (
	cartCountList: { id: number; count: number }[]
) => {
	const cartCountListString = JSON.stringify(cartCountList)

	Cookies.set('cartCountList', cartCountListString, {
		sameSite: 'None',
		secure: true
	})
}

export const getCookieDataCart = (name: string) => {
	const cookie = Cookies.get(name)
	if (cookie) {
		return JSON.parse(cookie)
	}
	return []
}
