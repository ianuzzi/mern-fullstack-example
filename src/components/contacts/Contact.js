import { TableRow, TableCell } from '@material-ui/core'

const Contact = ({ contact }) => {
	return (
		<>
			<TableRow key={contact._id}>
				<TableCell>{contact.name}</TableCell>
				<TableCell>{contact.company}</TableCell>
				<TableCell>{contact.email}</TableCell>
			</TableRow>

			{/* <p>{}</p>
			<p>{contact.name}</p>
			<p>{contact.company}</p>
			<p>{contact.street1}</p>
			<p>{contact.street2}</p>
			<p>{contact.city}</p>
			<p>{contact.state}</p>
			<p>{contact.zip}</p>
			<p>{contact.email}</p>
			<p>{contact.date_added}</p> */}
		</>
	)
}

export default Contact
