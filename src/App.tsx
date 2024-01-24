import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import ProductPage from './pages/ProductPage'

function App() {
	
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/offer/:id" element={<ProductPage />} />
			</Routes>
		</Router>
	)
}

export default App
