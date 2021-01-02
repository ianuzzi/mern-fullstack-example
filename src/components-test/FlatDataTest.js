import { useState, useEffect } from 'react'

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
			<h2>Here is some flat test data:</h2>
			{testData.map(data => {
				return <p key={data.id}>{data.text}</p>
			})}
		</>
	)
}

export default FlatDataTest
