import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import ProductPage from './pages/ProductPage'
import { useState } from 'react'

type IData = {
	data: {
		count: number
		offers: {
			owner: {
				account: {
					username: string
					avatar: {
						secure_url: string
					}
				}
			}
			product_date: string
			product_description: string
			product_details: [{ MARQUE: string }, { TAILLE: string }]
			product_image: {
				secure_url: string
			}
			product_name: string
			product_pictures: Array<object>
			product_price: number
			_id: string
		}[]
	}
}

function App() {
	const [data, setData] = useState<IData>({
		data: {
			count: 0,
			offers: [
				{
					owner: {
						account: {
							username: '',
							avatar: {
								secure_url: '',
							},
						},
					},
					product_date: '',
					product_description: '',
					product_details: [{ MARQUE: '' }, { TAILLE: '' }],
					product_image: {
						secure_url: '',
					},
					product_name: '',
					product_pictures: [],
					product_price: 0,
					_id: '',
				},
			],
		},
	})
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage data={data} setData={setData} />} />

				<Route path="/OffersPage/:id" element={<ProductPage data={data} />} />
			</Routes>
		</Router>
	)
}

export default App
