import React from 'react'
import { connect } from 'react-redux'
import { buyItem, sellItem } from '../reducers'

function TestContainer(props) {
	return (
		<>
			Redux example
			<p>Number of items - {props.numberOfItems}</p>
			<div>
				<button onClick={props.buyItem}>Buy Item</button>

				<button onClick={props.sellItem}>Sell Item</button>
			</div>
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
