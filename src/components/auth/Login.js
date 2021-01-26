import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link as RRLink, useHistory, useLocation } from 'react-router-dom'
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Typography,
	Container
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { loginUser, clearErrors } from '../../reducers'
import { useStyles } from '../../MuiTheme'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const Register = ({ isAuthenticated, error, loginUser, clearErrors }) => {
	//	//
	const classes = useStyles()

	const history = useHistory()
	const rquery = useQuery()
	const nextPage = rquery.get('redirect') || ''

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)

	const handleEmailChange = e => setEmail(e.target.value)
	const handlePasswordChange = e => setPassword(e.target.value)

	useEffect(() => {
		if (error.id !== 'LOGIN_FAIL') return
		setMessage(error.message)
		clearErrors()
	}, [error, clearErrors])

	useEffect(() => {
		if (!isAuthenticated) return
		history.push(`${nextPage}`)
	}, [isAuthenticated])

	const handleSubmit = e => {
		e.preventDefault()
		setMessage(null)
		loginUser({ email, password })
	}

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
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
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link variant="body2" component={RRLink} to="/register">
									{"Don't have an account? Sign Up"}
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

export default connect(mapStateToProps, { loginUser, clearErrors })(Register)
