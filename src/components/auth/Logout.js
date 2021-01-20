import React from 'react'
import { connect } from 'react-redux'
import { logoutSuccess } from '../../reducers'

function Logout({ logoutSuccess }) {
	return (
		<>
			<a href="" onClick={() => logoutSuccess()}>
				Logout
			</a>
		</>
	)
}

export default connect(null, { logoutSuccess })(Logout)
