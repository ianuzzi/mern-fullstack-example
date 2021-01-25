import mongoose from 'mongoose'
const Schema = mongoose.Schema

let userSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		register_date: {
			type: Date,
			default: Date.now
		}
	},
	{ collection: 'users' }
)

const User = mongoose.model('user', userSchema)
export default User
