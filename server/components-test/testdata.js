const mongoose = require('mongoose')

const Schema = mongoose.Schema

let testdata = new Schema(
	{
		text: {
			type: String,
			required: true
		}
	},
	{ collection: 'testdata' }
)

module.exports = mongoose.model('testdata', testdata)
