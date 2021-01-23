import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { loginUser, clearErrors } from '../../reducers'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const Register = ({ isAuthenticated, error, loginUser, clearErrors }) => {
	//	//
	const history = useHistory()
	const rquery = useQuery()
	const nextPage = rquery.get('redirect')

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
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={handleEmailChange}
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={handlePasswordChange}
				/>

				<input type="submit" value="Login" />
			</form>
			<Link to="/register">Register</Link>
			<p>{message || ''}</p>
		</>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
})

export default connect(mapStateToProps, { loginUser, clearErrors })(Register)
