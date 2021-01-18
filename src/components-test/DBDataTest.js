import { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

function DBDataTest() {
	const [testDataDB, setTestDataDB] = useState([])

	useEffect(() => {
		fetch(`/api/testdata`)
			.then(res => res.json())
			.then(data => {
				setTestDataDB(data)
			})
			.catch(error => {
				console.log(error.message)
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
				Here is some test data from MongoDB:
			</Typography>
			<Typography variant="h5" align="center" color="textSecondary">
				{testDataDB.map(data => {
					return <p key={data._id}>{data.text}</p>
				})}
			</Typography>
		</>
	)
}

export default DBDataTest
