import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import OfferPage from './pages/OfferPage'
import ModalLogin from './components/ModalLogin'
import ModalSignUp from './components/ModalSignUp'
import { useState } from 'react'
import Cookies from 'js-cookie'

function App() {
	const [token, setToken] = useState(Cookies.get('userToken') || '') // on stoke le token dans useState
	const [displayLogin, setDisplayLogin] = useState(false)
	const [displaySignUp, setDisplaySignUp] = useState(false)
	const [data, setData] = useState([])
	return (
		<Router>
			<Header
				setDisplayLogin={setDisplayLogin}
				setDisplaySignUp={setDisplaySignUp}
				token={token}
				setToken={setToken}
			
				setData={setData}
			/>

			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							data={data}
							setData={setData}
							displayLogin={displayLogin}
							displaySignUp={displaySignUp}
						/>
					}
				/>
				<Route path="/offer/:id" element={<OfferPage />} />
			</Routes>
			{displayLogin && (
				<ModalLogin
					setDisplaySignUp={setDisplaySignUp}
					setDisplayLogin={setDisplayLogin}
					setToken={setToken}
				/>
			)}
			{displaySignUp && (
				<ModalSignUp
					setDisplaySignUp={setDisplaySignUp}
					setDisplayLogin={setDisplayLogin}
					setToken={setToken}
				/>
			)}
		</Router>
	)
}

export default App
