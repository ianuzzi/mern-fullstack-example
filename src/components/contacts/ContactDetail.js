import React from 'react'

const ContactDetail = ({ match }) => {
	return (
		<>
			<p>{match.params.id}</p>
		</>
	)
}

export default ContactDetail
