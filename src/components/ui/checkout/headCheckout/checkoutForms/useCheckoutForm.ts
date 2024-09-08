import { Libraries, useLoadScript } from '@react-google-maps/api'
import { useEffect, useRef } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

const libraries: Libraries = ['places']
const apiKey = process.env.GOOGLE_API_KEY || ''

export const useCheckoutForm = (setValue: UseFormSetValue<FieldValues>) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: apiKey,
		libraries,
		language: 'en'
	})

	const autocompleteRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isLoaded) {
			const autocomplete = new window.google.maps.places.Autocomplete(
				autocompleteRef.current!,
				{
					types: ['address'],
					componentRestrictions: { country: 'us' }
				}
			)

			autocomplete.addListener('place_changed', () => {
				const place = autocomplete.getPlace()
				for (const component of place.address_components!) {
					const componentType = component.types[0]
					switch (componentType) {
						case 'street_number':
							setValue(
								'streetAddress',
								`${component.long_name} ${place.address_components?.find(c => c.types[0] === 'route')?.long_name || ''}`
							)
							break
						case 'locality':
							setValue('cityTown', component.long_name)
							break
						case 'administrative_area_level_1':
							setValue('stateCountry', component.short_name)
							break
						case 'postal_code':
							setValue('zipCode', component.long_name)
							break
					}
				}
			})
		}
	}, [isLoaded, setValue])

	return {
		autocompleteRef,
		isLoaded
	}
}
