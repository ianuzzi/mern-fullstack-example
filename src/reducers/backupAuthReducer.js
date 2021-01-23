import axios from 'axios'
import { getErrors, clearErrors } from './errorReducer'

///////////////////////////////////////////////////////////////////////////////
// action types
///////////////////////////////////////////////////////////////////////////////

export const actionTypes = {
	USER_LOADING: 'USER_LOADING',
	USER_LOADED: 'USER_LOADED',
	AUTH_ERROR: 'AUTH_ERROR',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAIL: 'LOGIN_FAIL',
	LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
	REGISTER_SUCCESS: 'REGISTER_SUCCESS',
	REGISTER_FAIL: 'REGISTER_FAIL'
}

///////////////////////////////////////////////////////////////////////////////
// actions and action creators
///////////////////////////////////////////////////////////////////////////////

////// simple actions

export const userLoading = () => {
	return { type: actionTypes.USER_LOADING }
}

export const userLoaded = payload => {
	return { type: actionTypes.USER_LOADED, payload }
}

export const authError = () => {
	return { type: actionTypes.AUTH_ERROR }
}

export const loginSuccess = payload => {
	return { type: actionTypes.LOGIN_SUCCESS, payload }
}

export const loginFail = () => {
	return { type: actionTypes.LOGIN_FAIL }
}

export const logoutSuccess = () => {
	return { type: actionTypes.LOGOUT_SUCCESS }
}

export const registerSuccess = payload => {
	return { type: actionTypes.REGISTER_SUCCESS, payload }
}

export const registerFail = () => {
	return { type: actionTypes.REGISTER_FAIL }
}

////// compound actions

// check token and load user

/**
 * Loads the user information of a user that has just logged in and has a valid
 * JWT.
 */
export const loadUser = () => (dispatch, getState) => {
	//
	dispatch(userLoading())

	const token = getState().auth.token || null

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': token
		}
	}

	axios
		.post('/api/auth/user', null, config)
		.then(response => {
			dispatch(userLoaded(response.data))
		})
		.catch(error => {
			dispatch(getErrors(error.response.data.message, error.response.status))
			dispatch(authError())
		})
}

/**
 * Registers a new user with the backend
 *
 * @param name The user name
 * @param email The user's email address
 * @param password The user's chosen password
 */
export const registerUser = ({ name, email, password }) => dispatch => {
	//
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ name, email, password })

	axios
		.post(`/api/users`, body, config)
		.then(response => dispatch(registerSuccess(response.data)))
		.catch(error => {
			dispatch(
				getErrors(
					error.response.data.message,
					error.response.status,
					actionTypes.REGISTER_FAIL
				)
			)
			dispatch(registerFail())
		})
}

/**
 * Log in a user
 *
 * @param email The user's email address
 * @param password The user's password
 */
export const loginUser = ({ email, password }) => dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ email, password })

	axios
		.post(`/api/auth`, body, config)
		.then(response => dispatch(loginSuccess(response.data)))
		.catch(error => {
			dispatch(
				getErrors(
					error.response.data.message,
					error.response.status,
					actionTypes.LOGIN_FAIL
				)
			)
			dispatch(loginFail())
		})
}

///////////////////////////////////////////////////////////////////////////////
// reducer
///////////////////////////////////////////////////////////////////////////////

//// initial state

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	user: null
}

//// handlers

const handleUserLoading = (state, action) => {
	return {
		...state,
		isLoading: true
	}
}

const handleUserLoaded = (state, action) => {
	return {
		...state,
		isAuthenticated: true,
		isLoading: false,
		user: action.payload
	}
}

const handleActivateAuth = (state, action) => {
	localStorage.setItem('token', action.payload.token)
	return {
		...state,
		...action.payload,
		isAuthenticated: true,
		isLoading: false
	}
}

const handleDeactivateAuth = (state, action) => {
	localStorage.removeItem('token')
	return {
		...state,
		token: null,
		user: null,
		isAuthenticated: false,
		isLoading: false
	}
}

const handlers = {
	[actionTypes.USER_LOADING]: handleUserLoading,
	[actionTypes.USER_LOADED]: handleUserLoaded,
	[actionTypes.AUTH_ERROR]: handleDeactivateAuth,
	[actionTypes.LOGIN_SUCCESS]: handleActivateAuth,
	[actionTypes.LOGIN_FAIL]: handleDeactivateAuth,
	[actionTypes.LOGOUT_SUCCESS]: handleDeactivateAuth,
	[actionTypes.REGISTER_SUCCESS]: handleActivateAuth,
	[actionTypes.REGISTER_FAIL]: handleDeactivateAuth
}

//// reducer proper

const reducerFactory = (initialState, handlers) => {
	return (state = initialState, action) => {
		if (!handlers.hasOwnProperty(action.type)) return state
		return handlers[action.type](state, action)
	}
}

export default reducerFactory(initialState, handlers)
