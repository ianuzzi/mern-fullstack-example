////const Testdata = require('./testdata')
import Testdata from './testdata.js'
/**
 * Responds to a GET request to 'api/test' with some flat data from file
 *
 * @param app An Express application
 */
const flatTestData = app => {
	app.get('/api/test', function (req, res) {
		const testFlat = [
			{ id: 1, text: 'Some text' },
			{ id: 2, text: 'Some other text' },
			{ id: 3, text: 'Some more text' }
		]

		res.status(200).json(testFlat)
	})
}

/**
 * Responds to a GET request to '/api/testdata' with test data from MongoDB
 *
 * @param app An Express application
 */
const dbTestData = app => {
	app.get('/api/testdata', async (req, res) => {
		try {
			const testdata = await Testdata.find()
			res.status(200).json(testdata)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	})
}

// module.exports = {
// 	flatTestData,
// 	dbTestData
// }

export { flatTestData, dbTestData }
