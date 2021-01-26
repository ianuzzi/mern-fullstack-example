import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link as RRLink, useHistory } from 'react-router-dom'
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container
} from '@material-ui/core'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import { registerUser, clearErrors } from '../../reducers'
import { useStyles } from '../../MuiTheme'

const Register = ({ isAuthenticated, error, registerUser, clearErrors }) => {
	//
	const classes = useStyles()

	const history = useHistory()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)

	const handleNameChange = e => setName(e.target.value)
	const handleEmailChange = e => setEmail(e.target.value)
	const handlePasswordChange = e => setPassword(e.target.value)

	useEffect(() => {
		if (!isAuthenticated) return
		history.push(`/`)
	}, [isAuthenticated])

	useEffect(() => {
		if (error.id !== 'REGISTER_FAIL') return
		setMessage(error.message)
		clearErrors()
	}, [error, clearErrors])

	const handleSubmit = e => {
		e.preventDefault()
		setMessage(null)
		registerUser({ name, email, password })
	}

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<PersonAddOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoComplete="name"
							autoFocus
							onChange={handleNameChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handleEmailChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handlePasswordChange}
						/>
						<Typography variant="body1">{message || ''}</Typography>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Register
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link variant="body2" component={RRLink} to="/register">
									Have an account? Log in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
})

export default connect(mapStateToProps, { registerUser, clearErrors })(Register)
