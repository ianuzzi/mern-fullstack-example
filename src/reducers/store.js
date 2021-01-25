import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import testReducer from './testReducer.js'
import errorReducer from './errorReducer.js'
import authReducer from './authReducer.js'
import logger from 'redux-logger'

const rootReducer = combineReducers({
	test: testReducer,
	error: errorReducer,
	auth: authReducer
})

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)) //, logger
)

export default store
