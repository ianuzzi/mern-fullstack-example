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
			Here is some flat test data:
			{testData.map(data => {
				return <p key={data.id}>{data.text}</p>
			})}
		</>
	)
}

export default FlatDataTest
