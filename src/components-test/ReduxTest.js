import React from 'react'
import { connect } from 'react-redux'
import { buyItem, sellItem } from '../reducers'
import { Typography } from '@material-ui/core'

function TestContainer(props) {
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
			<Typography variant="h5" align="center" color="textPrimary">
				<p>Number of items - {props.numberOfItems}</p>
				<p>
					<button onClick={props.buyItem}>Buy Item</button>
					<button onClick={props.sellItem}>Sell Item</button>
				</p>
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
