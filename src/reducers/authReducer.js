import axios from 'axios'
import { getErrors, clearErrors } from './errorReducer'

const actionTypes = {}
const handlers = {}

///////////////////////////////////////////////////////////////////////////////
// User Loading
///////////////////////////////////////////////////////////////////////////////

actionTypes.USER_LOADING = 'USER_LOADING'

export const userLoading = () => {
	return { type: actionTypes.USER_LOADING }
}

const handleUserLoading = (state, action) => {
	return {
		...state,
		isLoading: true
	}
}

handlers[actionTypes.USER_LOADING] = handleUserLoading

///////////////////////////////////////////////////////////////////////////////
// User Loaded
///////////////////////////////////////////////////////////////////////////////

actionTypes.USER_LOADED = 'USER_LOADED'

export const userLoaded = payload => {
	return { type: actionTypes.USER_LOADED, payload }
}

const handleUserLoaded = (state, action) => {
	return {
		...state,
		isAuthenticated: true,
		isLoading: false,
		user: action.payload
	}
}

handlers[actionTypes.USER_LOADED] = handleUserLoaded

///////////////////////////////////////////////////////////////////////////////
// Activate Auth
///////////////////////////////////////////////////////////////////////////////

actionTypes.LOGIN_SUCCESS = 'LOGIN_SUCCESS'
actionTypes.REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const loginSuccess = payload => {
	return { type: actionTypes.LOGIN_SUCCESS, payload }
}
export const registerSuccess = payload => {
	return { type: actionTypes.REGISTER_SUCCESS, payload }
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

handlers[actionTypes.LOGIN_SUCCESS] = handleActivateAuth
handlers[actionTypes.REGISTER_SUCCESS] = handleActivateAuth

///////////////////////////////////////////////////////////////////////////////
// Deactivate Auth
///////////////////////////////////////////////////////////////////////////////

actionTypes.AUTH_ERROR = 'AUTH_ERROR'
actionTypes.LOGIN_FAIL = 'LOGIN_FAIL'
actionTypes.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
actionTypes.REGISTER_FAIL = 'REGISTER_FAIL'

export const authError = () => {
	return { type: actionTypes.AUTH_ERROR }
}
export const loginFail = () => {
	return { type: actionTypes.LOGIN_FAIL }
}
export const logoutSuccess = () => {
	return { type: actionTypes.LOGOUT_SUCCESS }
}
export const registerFail = () => {
	return { type: actionTypes.REGISTER_FAIL }
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

handlers[actionTypes.AUTH_ERROR] = handleDeactivateAuth
handlers[actionTypes.LOGIN_FAIL] = handleDeactivateAuth
handlers[actionTypes.LOGOUT_SUCCESS] = handleDeactivateAuth
handlers[actionTypes.REGISTER_FAIL] = handleDeactivateAuth

///////////////////////////////////////////////////////////////////////////////
// Compound Actions
///////////////////////////////////////////////////////////////////////////////

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
// Reducer
///////////////////////////////////////////////////////////////////////////////

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	user: null
}

const reducerFactory = (initialState, handlers) => {
	return (state = initialState, action) => {
		if (!handlers.hasOwnProperty(action.type)) return state
		return handlers[action.type](state, action)
	}
}

export default reducerFactory(initialState, handlers)
