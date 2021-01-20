///////////////////////////////////////////////////////////////////////////////
// action types
///////////////////////////////////////////////////////////////////////////////

export const actionTypes = {
	GET_ERRORS: 'GET_ERRORS',
	CLEAR_ERRORS: 'CLEAR_ERRORS'
}

///////////////////////////////////////////////////////////////////////////////
// actions and action creators
///////////////////////////////////////////////////////////////////////////////

////// simple actions
/**
 *
 * @param message
 * @param status
 * @param id
 */
export const getErrors = (message, status, id = null) => {
	return { type: actionTypes.GET_ERRORS, payload: { message, status, id } }
}

export const clearErrors = () => {
	return { type: actionTypes.CLEAR_ERRORS }
}

////// compound actions

///////////////////////////////////////////////////////////////////////////////
// reducer
///////////////////////////////////////////////////////////////////////////////

//// initial state

const initialState = {
	message: {},
	status: null,
	id: null
}

//// handlers

const handleGetErrors = (state, action) => {
	return {
		message: action.payload.message,
		status: action.payload.status,
		id: action.payload.id
	}
}

const handleClearErrors = (state, action) => {
	return {
		message: {},
		status: null,
		id: null
	}
}

const handlers = {
	[actionTypes.GET_ERRORS]: handleGetErrors,
	[actionTypes.CLEAR_ERRORS]: handleClearErrors
}

//// reducer proper

const reducerFactory = (initialState, handlers) => {
	return (state = initialState, action) => {
		if (!handlers.hasOwnProperty(action.type)) return state
		return handlers[action.type](state, action)
	}
}

export default reducerFactory(initialState, handlers)
