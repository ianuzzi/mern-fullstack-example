import { NavLink } from 'react-router-dom'
import { Typography, Link } from '@material-ui/core'
import { useStyles } from '../../MuiTheme'

const AppBarLink = ({ to = null, children }) => {
	const classes = useStyles()

	return (
		<>
			<Typography variant="h6" noWrap>
				{to ? (
					<Link component={NavLink} to={to} className={classes.linkStyle}>
						{children}
					</Link>
				) : (
					children
				)}
			</Typography>
		</>
	)
}

export default AppBarLink
