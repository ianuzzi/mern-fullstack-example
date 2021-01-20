import React from 'react'
import { connect } from 'react-redux'
import { buyItem, sellItem } from '../reducers'
import { Typography, Grid, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	heroButtons: {
		marginTop: theme.spacing(4)
	}
}))

function TestContainer(props) {
	const classes = useStyles()
	return (
		<>
			<Typography
				component="h2"
				variant="h2"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				Redux example
			</Typography>
			<Typography variant="h5" align="center" color="textSecondary">
				<p>Number of items - {props.numberOfItems}</p>
				<div className={classes.heroButtons}>
					<Grid container spacing={2} justify="center">
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								onClick={props.buyItem}
							>
								Buy Item
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								onClick={props.sellItem}
							>
								Sell Item
							</Button>
						</Grid>
					</Grid>
				</div>
			</Typography>
		</>
	)
}

const mapStateToProps = state => {
	return {
		numberOfItems: state.test.numberOfItems
	}
}

const mapDispatchToProps = dispatch => {
	return {
		buyItem: () => dispatch(buyItem()),
		sellItem: () => dispatch(sellItem())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)
