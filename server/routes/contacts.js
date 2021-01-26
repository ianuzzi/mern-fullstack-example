import express from 'express'
const contactsRoute = express.Router()

import Contact from '../models/Contact.js'

/**
 * Middleware to retrieve a contact given the contact id
 * in the url params and add that contact to the res object
 *
 * @param req
 * @param res
 * @param next
 */
const getContact = async (req, res, next) => {
	//
	let contact

	try {
		contact = await Contact.findById(req.params.id)
		if (!contact) {
			return res.status(404).json({ message: 'Contact not found' })
		}
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}

	res.contact = contact
	next()
}

/**
 * CREATE A NEW CONTACT
 *
 * @route POST api/contacts
 *
 * @desc Adds a new contact
 * @access Private
 */
contactsRoute.post('/', async (req, res) => {
	//
	if (!req.body.name && !req.body.company)
		return res.status(400).json({ message: 'Required info missing' })

	const contact = new Contact(req.body)

	try {
		const newContact = await contact.save()
		res.status(201).json(newContact)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * GET ALL CONTACTS
 *
 * @route GET api/contacts
 *
 * @desc Gets all contacts
 * @access Private
 */
contactsRoute.get('/', async (req, res) => {
	try {
		const contacts = await Contact.find()
		return res.status(200).json(contacts)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

/**
 * GET A CONTACT BY ID
 *
 * @param id The contact id in the URL params
 *
 * @route POST api/contacts/:id
 *
 * @desc Returns a single contact by contact id
 * @access Private
 */
contactsRoute.get('/:id', getContact, async (req, res) => {
	res.status(200).json(res.contact)
})

/**
 * UPDATE/PATCH A CONTACT BY ID
 *
 * @param id The contact id in the URL params
 *
 * @route POST api/contacts/:id
 *
 * @desc Updates a single contact by contact id
 * @access Private
 * res.contact is contact document object added by middleware
 */
contactsRoute.patch('/:id', getContact, async (req, res) => {
	//
	const updateFields = [
		'name',
		'company',
		'street1',
		'street2',
		'city',
		'state',
		'zip',
		'email'
	]

	for (const field of updateFields) {
		if (req.body[field]) {
			res.contact[field] = req.body[field]
		}
	}

	try {
		const updatedContact = await res.contact.save()
		res.status(200).json(updatedContact)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

/**
 * DELETE A CONTACT BY ID
 *
 * @param id The contact id in the URL params
 *
 * @route DELETE api/contacts/:id
 *
 * @desc Deletes a single contact by contact id
 * @access Private
 */
contactsRoute.delete('/:id', getContact, async (req, res) => {
	try {
		await res.contact.remove()
		res.status(200).json({ message: 'Contact deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export default contactsRoute
