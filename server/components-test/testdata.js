////const mongoose = require('mongoose')
import mongoose from 'mongoose'

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

const Testdata = mongoose.model('testdata', testdata)
///module.exports = mongoose.model('testdata', testdata)
export default Testdata
