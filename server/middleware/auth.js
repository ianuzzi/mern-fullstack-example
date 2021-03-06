import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'

/**
 * Returns next to protected routes if authorized
 * or not authorized response if not
 *
 * @param req
 * @param res
 * @param next
 */
function auth(req, res, next) {
	const token = req.header('X-Auth-Token')
	if (!token)
		return res.status(401).json({ message: 'No token present in request' })
	else {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = decoded
			next()
			return
		} catch (error) {
			res
				.status(401)
				.json({ message: 'Token is not valid', error_thrown: error })
		}
	}
}

export default auth
