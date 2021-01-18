import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import testReducer from './testReducer.js'
import logger from 'redux-logger'

const rootReducer = combineReducers({
	test: testReducer
})

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk, logger))
)

export default store
