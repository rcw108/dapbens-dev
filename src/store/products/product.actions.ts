import { createAsyncThunk } from '@reduxjs/toolkit'

import { ProductService } from '@/services/product.service'
import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

// getAllProducts
export const getAllProducts = createAsyncThunk<WooCommerceSingleProduct[]>(
	'auth/login',
	async (_, thunkApi) => {
		try {
			console.log(ProductService.getAllProducts())
			const response = await ProductService.getAllProducts()
			console.log(response)
			return response.data
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)
