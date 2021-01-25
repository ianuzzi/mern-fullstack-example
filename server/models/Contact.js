import mongoose from 'mongoose'
const Schema = mongoose.Schema

let ContactSchema = new Schema(
	{
		name: { type: String },
		company: { type: String },
		street1: { type: String },
		street2: { type: String },
		city: { type: String },
		state: { type: String },
		zip: { type: String },
		email: { type: String },
		date_added: { type: Date, default: Date.now }
	},
	{ collection: 'contacts' }
)

const Contact = mongoose.model('Contact', ContactSchema)
export default Contact
