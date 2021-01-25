import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './reducers/store'
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { theme } from './MuiTheme' // Use with Material UI

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
