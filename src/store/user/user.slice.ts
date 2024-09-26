import {
	getUserFromCookie,
	removeUserToCookie,
	saveUserToCookie
} from '@/utils/cookie.hepler'
import { createSlice } from '@reduxjs/toolkit'
import { InitialUser } from './user.interface'

const initialState: InitialUser = {
	user: getUserFromCookie(),
	jwt: ''
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }: { payload: InitialUser }) {
			console.log(payload)
			state.user = payload.user
			state.jwt = payload.jwt
			saveUserToCookie(state)
		},
		logout(state) {
			state.user = null
			state.jwt = ''
			removeUserToCookie()
		}
	}
})

export const { setUser, logout } = userSlice.actions
export const { reducer } = userSlice
