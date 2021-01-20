// action types

const actionTypes = {
	BUY_ITEM: 'BUY_ITEM',
	SELL_ITEM: 'SELL_ITEM'
}

// action creators

export const buyItem = (number = 1) => {
	return { type: actionTypes.BUY_ITEM, payload: number }
}

export const sellItem = (number = 1) => {
	return { type: actionTypes.SELL_ITEM, payload: number }
}

// reducer

//// handlers

const debitItemCount = (state, action) => {
	return {
		...state,
		numberOfItems: state.numberOfItems - action.payload
	}
}

const creditItemCount = (state, action) => {
	return {
		...state,
		numberOfItems: state.numberOfItems + action.payload
	}
}

const handlers = {
	[actionTypes.BUY_ITEM]: creditItemCount,
	[actionTypes.SELL_ITEM]: debitItemCount
}

//// reducer proper

const initialState = {
	numberOfItems: 10
}

const reducerFactory = (initialState, handlers) => {
	return (state = initialState, action) => {
		if (!handlers.hasOwnProperty(action.type)) return state
		return handlers[action.type](state, action)
	}
}

export default reducerFactory(initialState, handlers)
