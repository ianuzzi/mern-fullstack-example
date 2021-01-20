import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser, clearErrors } from '../../reducers'

const Register = ({ isAuthenticated, error, loginUser, clearErrors }) => {
	//
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
			<p>{message || ''}</p>
		</>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.isAuthenticated,
	error: state.error
})

export default connect(mapStateToProps, { loginUser, clearErrors })(Register)
