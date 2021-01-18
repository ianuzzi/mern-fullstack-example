import { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

function FlatDataTest() {
	const [testData, setTestData] = useState([])

	useEffect(() => {
		fetch(`/api/test`)
			.then(res => res.json())
			.then(data => {
				setTestData(data)
			})
	}, [])

	return (
		<>
			<Typography
				component="h2"
				variant="h2"
				align="center"
				color="textPrimary"
				gutterBottom
			>
				Here is some flat test data:
			</Typography>
			<Typography variant="h5" align="center" color="textSecondary">
				{testData.map(data => {
					return <p key={data.id}>{data.text}</p>
				})}
			</Typography>
		</>
	)
}

export default FlatDataTest
