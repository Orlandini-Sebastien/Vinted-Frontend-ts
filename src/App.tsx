import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import OfferPage from './pages/OfferPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
//import Modal from './components/Modal'
import { useState } from 'react'
import Cookies from 'js-cookie'

function App() {
	//const [visible, setVisible] = useState(false);
	const [token, setToken] = useState(Cookies.get('userToken') || '') // on stoke le token dans useState
	return (
		<Router>
			<Header token={token} setToken={setToken} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/offer/:id" element={<OfferPage />} />
				<Route path="/user/signup" element={<SignUp setToken={setToken} />} />
				<Route
					path="/user/login"
					element={
						<Login layout="h-[80vh] w-screen flex flex-col justify-center items-center" />
					}
				/>
			</Routes>
		</Router>
	)
}

export default App
