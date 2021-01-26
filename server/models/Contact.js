import mongoose from 'mongoose'
const Schema = mongoose.Schema

let ContactSchema = new Schema(
	{
		name: {
			salutation: String,
			first: String,
			middle: String,
			last: String,
			suffix: String
		},
		company: String,
		street1: String,
		street2: String,
		city: String,
		state: String,
		zip: String,
		email: String,
		date_added: { type: Date, default: Date.now }
	},
	{
		collection: 'contacts',
		toJSON: { virtuals: true }
	}
)

ContactSchema.virtual('fullName').get(function () {
	return this.name.first + ' ' + this.name.last
})

ContactSchema.virtual('displayName').get(function () {
	if (!this.name.first && !this.name.last) {
		return this.company
	} else {
		return this.name.first + ' ' + this.name.last
	}
})

const Contact = mongoose.model('Contact', ContactSchema)
export default Contact
