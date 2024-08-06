export interface Dimensions {
	length: string
	width: string
	height: string
}

export interface Category {
	id: number
	name: string
	slug: string
}

export interface Tag {
	id: number
	name: string
	slug: string
}

export interface Image {
	id: number
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	src: string
	name: string
	alt: string
}

export interface Meta {
	id: number
	key: string
	value: string | string[] | number[]
}

export interface WooCommerceSingleProduct {
	id: number
	name: string
	slug: string
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	type: string
	status: string
	featured: boolean | string
	catalog_visibility: string
	description: string
	short_description: string
	sku: string
	price: string
	regular_price: string
	sale_price: string
	date_on_sale_from: string
	date_on_sale_from_gmt: string
	date_on_sale_to: string
	date_on_sale_to_gmt: string
	on_sale: boolean
	purchasable: boolean
	total_sales: number
	virtual: boolean
	external_url: string
	button_text: string
	manage_stock: boolean
	stock_quantity: number
	in_stock: boolean
	backorders: string
	backorders_allowed: boolean
	backordered: boolean
	sold_individually: boolean
	weight: string
	dimensions: Dimensions
	shipping_required: boolean
	shipping_taxable: boolean
	shipping_class: string
	shipping_class_id: number
	reviews_allowed: boolean
	average_rating: string
	rating_count: number
	upsell_ids: number[]
	cross_sell_ids: number[]
	parent_id: number
	purchase_note: string
	categories: Category[]
	tags: Tag[]
	images: Image[]
	// attributes: []
	// default_attributes: []
	// variations: []
	// grouped_products: []
	menu_order: number
	price_html: string
	related_ids: number[]
	meta_data: Meta[]
	stock_status: string
	has_options: boolean
	post_password: string
}
