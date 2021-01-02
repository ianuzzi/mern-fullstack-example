import { useState, useEffect } from 'react'

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
			<h2>Here is some test data from MongoDB:</h2>
			{testDataDB.map(data => {
				return <p key={data._id}>{data.text}</p>
			})}
		</>
	)
}

export default DBDataTest
