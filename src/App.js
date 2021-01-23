import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './reducers'
import { CssBaseline, AppBar, Toolbar, Container } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useStyles } from './MuiTheme'
import { AppBarLink } from './components/ui'
import 'typeface-roboto'
import './App.css'
import TestContent from './components/TestContent'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import Login from './components/auth/Login'

function App({ loadUser, isAuthenticated }) {
	//
	const classes = useStyles()

	useEffect(() => loadUser(), [loadUser, isAuthenticated])

	return (
		<div className="App">
			<BrowserRouter>
				<CssBaseline />
				<AppBar position="relative">
					<Toolbar>
						<MenuIcon className={classes.icon} />

						<AppBarLink draggable="false" to="/">
							Home
						</AppBarLink>
						<AppBarLink to="/test">Test Data</AppBarLink>
						{!isAuthenticated ? (
							<AppBarLink to="/login">Login</AppBarLink>
						) : (
							<AppBarLink>
								<Logout />
							</AppBarLink>
						)}
					</Toolbar>
				</AppBar>
				<main>
					{/* Hero unit */}
					<div className={classes.heroContent}>
						<Container maxWidth="md">
							<ProtectedRoute
								path="/test"
								isAuthenticated={isAuthenticated}
								component={TestContent}
							/>
							<Route path="/login" component={Login} />
							<Route path="/register" exact strict component={Register} />
							{isAuthenticated ? 'yes' : 'no'}
						</Container>
					</div>
				</main>
			</BrowserRouter>
		</div> //.App
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loadUser })(App)
