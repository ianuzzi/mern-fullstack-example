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
	}
}))

export { theme, useStyles }
