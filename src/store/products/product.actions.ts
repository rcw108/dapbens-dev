// import { createAsyncThunk } from '@reduxjs/toolkit'

// import { ProductService } from '@/services/product.service'
// import { WooCommerceSingleProduct } from '@/types/wooCommerce.interface'

// // getAllProducts
// export const getAllProducts = createAsyncThunk<WooCommerceSingleProduct[]>(
// 	'all products',
// 	async (_, thunkApi) => {
// 		try {
// 			const response = await ProductService.getAllProducts()
// 			return response.data
// 		} catch (error) {
// 			return thunkApi.rejectWithValue(error)
// 		}
// 	}
// )
