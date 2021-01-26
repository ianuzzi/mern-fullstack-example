import { createMuiTheme, makeStyles } from '@material-ui/core'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#3f51b5'
		}
	}
})

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	linkStyle: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		color: theme.palette.common.white
	},
	selectRowLink: {
		textDecorationStyle: 'none',
		'&:hover': {
			textDecorationStyle: 'solid',
			backgroundColor: theme.palette.grey[100]
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

export { theme, useStyles }
