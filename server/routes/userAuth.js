require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

/**
 * @function router
 */
const router = express.Router()

// user model

const User = require('../models/User')

/**
 * @route POST api/auth
 * @desc Authenticate user
 * @access Public
 */
router.post('/', (req, res) => {
	const { email, password } = req.body

	// validate needed fields present
	if (!email || !password)
		return res.status(400).json({ message: 'Required info missing' })

	// check if user exists

	// TODO: Refactor with async and promises
	// TODO: catch on user.findone

	User.findOne({ email }).then(user => {
		if (!user) return res.status(400).json({ message: 'User does not exist' })

		bcrypt
			.compare(password, user.password)
			.then(isMatch => {
				if (!isMatch)
					return res.status(400).json({
						message: 'Password is incorrect'
					})

				jwt.sign(
					// TODO: remove to another function/file along with user.js
					{ id: user.id },
					process.env.JWT_SECRET,
					{ expiresIn: 3600 },
					(error, token) => {
						if (error) throw error
						res.status(200).json({
							status: 'User loged in successfully',
							token,
							user: {
								id: user.id,
								name: user.name
							}
						})
					}
				)
			})
			.catch(error => res.status(400).json({ message: error.message }))
	})
})

/**
 * @route POST api/auth/user
 * @desc Get user data
 * @access Private
 */
router.post('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.send(user))
		.catch(error => res.status(400).json({ message: error.message }))
})

module.exports = router
