import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser, clearErrors } from '../../reducers'

const Register = ({ isAuthenticated, error, registerUser, clearErrors }) => {
	//
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)

	const handleNameChange = e => setName(e.target.value)
	const handleEmailChange = e => setEmail(e.target.value)
	const handlePasswordChange = e => setPassword(e.target.value)

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

	const handleReset = e => e.target.reset()

	return (
		<>
			<h2>Register</h2>
			<form onSubmit={handleSubmit} onReset={handleReset}>
				<label htmlFor="name">Name</label>
				<input type="text" name="name" id="name" onChange={handleNameChange} />

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

				<input type="submit" value="Register" />
				<input type="reset" value="Clear" />
			</form>
			<p>{message || ''}</p>
		</>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.isAuthenticated,
	error: state.error
})

export default connect(mapStateToProps, { registerUser, clearErrors })(Register)
