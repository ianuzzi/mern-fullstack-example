import axios from 'axios'
import { useState, useEffect } from 'react'
import {
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from '@material-ui/core'

import Contact from './Contact'

const Contacts = () => {
	//
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/contacts`)
			.then(response => {
				setContacts(response.data)
			})
			.catch(error => {
				console.log(error.message)
			})
	}, [])

	return (
		<>
			<Typography variant="h3">Contacts</Typography>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell></TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{contacts
						? contacts.map(contact => (
								<Contact key={contact._id} contact={contact} />
						  ))
						: ''}
				</TableBody>
			</Table>
		</>
	)
}

export default Contacts
