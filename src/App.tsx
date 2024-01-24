import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import ProductPage from './pages/ProductPage'
import SignUp from './pages/SignUp'

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/offer/:id" element={<ProductPage />} />
				<Route path="/user/signup" element={<SignUp />} />
			</Routes>
		</Router>
	)
}

export default App
