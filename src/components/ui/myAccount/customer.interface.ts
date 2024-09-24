export interface RegistrationCustomer {
	email: string
	username: string
	password: string
}

export interface AuthCustomer {
	login: string
	password: string
}

export interface CreatedCustomer {
	message?: string
	id: number
	date_created: string
	date_created_gmt: string
	date_modified: string
	date_modified_gmt: string
	email: string
	first_name: string
	last_name: string
	role: string
	username: string
	billing: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		postcode: string
		country: string
		state: string
		email: string
		phone: string
	}
	shipping: {
		first_name: string
		last_name: string
		company: string
		address_1: string
		address_2: string
		city: string
		postcode: string
		country: string
		state: string
		phone: string
	}
}
