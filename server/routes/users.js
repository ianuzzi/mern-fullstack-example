require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @function router
 */
const router = express.Router()

// user model

const User = require('../models/User')

/**
 * @route POST api/users
 *
 * @desc Register a new user
 * @access Public
 */
router.post('/', (req, res) => {
	const { name, email, password } = req.body

	// validate needed fields present
	if (!name || !email || !password)
		return res.status(400).json({ message: 'Required info missing' })

	// check if user exists

	// TODO: Refactor with async and promises
	// TODO: catch on user.findone

	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ message: 'User already exists' })

		bcrypt.hash(password, 10, (err, hash) => {
			if (err) throw err

			const newUser = new User({
				name,
				email,
				password: hash
			})

			newUser
				.save()
				.then(user => {
					// TODO: remove to another function/file along with auth.js
					jwt.sign(
						{ id: user.id },
						process.env.JWT_SECRET,
						{ expiresIn: 3600 },
						(error, token) => {
							if (error) throw error
							res.status(200).json({
								status: 'User added successfully',
								token,
								user: {
									id: user.id,
									name: user.name
								}
							})
						}
					)
				})
				.catch(error => res.status(500).json({ err: error }))
		})
	})
})

//
module.exports = router
