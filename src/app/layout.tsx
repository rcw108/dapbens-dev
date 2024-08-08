import MainProvider from '@/providers/MainProvider'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Oswald, Sofia_Sans } from 'next/font/google'
import './globals.scss'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

const sofia = Sofia_Sans({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700']
})

const oswald = Oswald({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={clsx(sofia.className, oswald.className)}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
