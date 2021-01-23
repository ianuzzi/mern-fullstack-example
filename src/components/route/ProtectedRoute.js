import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({
	path,
	isAuthenticated,
	component: Component,
	redirect = '/login'
}) => {
	return (
		<Route
			path={path}
			exact
			strict
			render={() =>
				isAuthenticated ? (
					<Component />
				) : (
					<Redirect to={`${redirect}?redirect=${encodeURI(path)}`} />
				)
			}
		/>
	)
}

export default ProtectedRoute
