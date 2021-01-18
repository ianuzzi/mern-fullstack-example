import { Provider } from 'react-redux'
import store from './reducers/store'
import {
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Container,
	Button,
	makeStyles
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import FlatDataTest from './components-test/FlatDataTest'
import DBDataTest from './components-test/DBDataTest'
import HeaderTest from './components-test/HeaderTest'
import ReduxTest from './components-test/ReduxTest'
import 'typeface-roboto'
import './App.css'

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	}
}))

function App() {
	//
	const classes = useStyles()

	return (
		<Provider store={store}>
			<div className="App">
				<CssBaseline />
				<AppBar position="relative">
					<Toolbar>
						<MenuIcon className={classes.icon} />
						<Typography variant="h6" color="inherit" noWrap>
							Menu Item
						</Typography>
					</Toolbar>
				</AppBar>

				<main>
					{/* Hero unit */}
					<div className={classes.heroContent}>
						<Container maxWidth="md">
							<HeaderTest />
							<ReduxTest />
							<FlatDataTest />
							<DBDataTest />
							<div className={classes.heroButtons}>
								<Grid container spacing={2} justify="center">
									<Grid item>
										<Button variant="contained" color="primary">
											Main call to action
										</Button>
									</Grid>
									<Grid item>
										<Button variant="outlined" color="primary">
											Secondary action
										</Button>
									</Grid>
								</Grid>
							</div>
						</Container>
					</div>
				</main>
			</div>
		</Provider>
	)
}

export default App
