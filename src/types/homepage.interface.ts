export interface Advantage {
	icon: string
	text: string
}

export interface MoveLineContent extends Advantage {}

export interface HomeACF {
	hero_section_title: string
	background_image: boolean | string
	start_image: boolean | string
	start_text: string
	advantages: Advantage[] | null
	button_link: {
		title: string
		url: string
		target: string
	}
	right_image: boolean | string
	move_line_background_image: boolean | string
	move_line_content: MoveLineContent[] | null
}

export interface IHome {
	id: number
	date: string
	date_gmt: string
	guid: {
		rendered: string
	}
	modified: string
	modified_gmt: string
	slug: string
	status: string
	type: string
	link: string
	title: {
		rendered: string
	}
	content: {
		rendered: string
		protected: boolean
	}
	excerpt: {
		rendered: string
		protected: boolean
	}
	author: number
	featured_media: number
	parent: number
	menu_order: number
	comment_status: string
	ping_status: string
	template: string
	meta: {
		_acf_changed: boolean
		footnotes: string
	}
	acf: HomeACF
}
