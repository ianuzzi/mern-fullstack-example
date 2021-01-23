import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logoutSuccess } from '../../reducers'
import { Link, Typography } from '@material-ui/core'
import { useStyles } from '../../MuiTheme'

function Logout({ logoutSuccess }) {
	//
	const classes = useStyles()

	const history = useHistory()

	return (
		<>
			<Link
				href=""
				className={classes.linkStyle}
				onClick={e => {
					e.preventDefault()
					logoutSuccess()
					history.push('/')
				}}
			>
				Logout
			</Link>
		</>
	)
}

export default connect(null, { logoutSuccess })(Logout)
