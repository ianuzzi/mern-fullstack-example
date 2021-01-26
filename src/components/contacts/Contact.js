import { Link as RRLink } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'
import { useStyles } from '../../MuiTheme'

const Contact = ({ contact }) => {
	//
	const classes = useStyles()

	return (
		<>
			<TableRow
				key={contact._id}
				component={RRLink}
				to={`/contacts/${contact._id}`}
				className={classes.selectRowLink}
			>
				<TableCell>{contact.displayName}</TableCell>
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
