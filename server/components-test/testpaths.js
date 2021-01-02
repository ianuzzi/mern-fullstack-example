// FLAT TESTDATA ROUTE

flatTestData = app => {
	app.get('/api/test', function (req, res) {
		testFlat = [
			{ id: 1, text: 'Some text' },
			{ id: 2, text: 'Some other text' },
			{ id: 3, text: 'Some more text' }
		]

		res.status(200).json(testFlat)
	})
}

// TESTDATA FROM MONGO AND ROUTE

dbTestData = app => {
	const Testdata = require('./testdata')

	app.get('/api/testdata', async (req, res) => {
		try {
			const testdata = await Testdata.find()
			res.status(200).json(testdata)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	})
}

module.exports = {
	flatTestData,
	dbTestData
}
