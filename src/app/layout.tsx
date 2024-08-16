import { layoutUrl } from '@/configs/layout.config'
import MainProvider from '@/providers/MainProvider'
import { ILayout } from '@/types/layout.interface'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Montserrat, Oswald, Sofia_Sans } from 'next/font/google'
import './globals.scss'

export async function generateMetadata(): Promise<Metadata> {
	const { data }: { data: ILayout } = await fetch(layoutUrl, {
		cache: 'force-cache'
	}).then(res => res.json())
	return {
		title: data.name,
		description: data.description,
		icons: {
			icon: [{ url: data.site_icon_url }],
			shortcut: [data.site_icon_url],
			apple: [
				{ url: data.site_icon_url },
				{ url: data.site_icon_url, sizes: '180x180', type: 'image/png' }
			],
			other: [
				{
					rel: 'apple-touch-icon-precomposed',
					url: data.site_icon_url
				}
			]
		}
	}
}

const sofia = Sofia_Sans({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-sofia-sans'
})

const oswald = Oswald({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-oswald'
})

const mont = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-mont'
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={clsx(sofia.variable, oswald.variable, mont.variable)}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
