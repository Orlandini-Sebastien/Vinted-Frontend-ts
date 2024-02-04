import { useLocation } from 'react-router'
import { useEffect } from 'react'
import axios from 'axios'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/ChekoutForm'

const stripePromise = loadStripe("pk_test_51Og3g0K49B9HgdPIZv3v5FNYGr48MyJx5x4xMoFMx2PvcbwHmVPlSBecoPBLbOGnnbedpekJ3m7bSJpSucrbPMU5000zwzlrT1");

type PaymentType = {
	token: string
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Payment = ({ token, setDisplayLogin }: PaymentType) => {
	const data = useLocation()
	const protection_acheteur: number = 0.40
	const frais_port: number = 0.80
	console.log(data.state.price, data.state.product_name)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.request({
					headers: {
						Authorization: `Bearer ${token}`,
					},
					method: 'POST',
					url: `https://site--backend-vinted--cfvhczrj5zks.code.run/payment`,
				})

				console.log(data)
			} catch (e) {
				const error = e as AxiosError

				console.log('catch app>>>', error.response)
				if (error.response?.status === 401) {
					navigate('/', { state: { path: 'payment' } })
					setDisplayLogin(true)
				}
			}
		}
		fetchData()
	}, [])

	return (
		<div className="h-[85vh] bg-[#EBEDEE]  ">
			<div className="flex justify-center  items-center  h-full">
				<div className="max-lg:w-[70%] p-4 lg:w-[40%] h-[70%]  bg-white flex flex-col justify-around  ">
					<div className="h-[10%] text-gray-400">Résumé de la commande</div>
					<div className="h-[20%] text-gray-500">
						<div className="flex justify-between">
							Commande <span> {data.state.price.toFixed(2)} €</span>
						</div>
						<div className="flex justify-between">
							Frais de protection acheteurs
							<span> {protection_acheteur.toFixed(2)} € </span>
						</div>
						<div className="flex justify-between  ">
							Frais de port <span> {frais_port.toFixed(2)} € </span>
						</div>
					</div>

					<div className="h-[20%] font-bold flex justify-between items-center">
						Total
						<span>{(data.state.price + protection_acheteur + frais_port).toFixed(2)} €</span>
					</div>
					<div className="h-[20%]">
						Il ne vous reste plus qu'une étape pour vous offrir{' '}
						<span className="font-bold px-1 ">{data.state.product_name}</span>. Vous
						allez payer 
						<span className="font-bold px-1"> 
						{(data.state.price + protection_acheteur + frais_port).toFixed(2)} €
						</span>
						(frais de protection et frais de port inclus).
					</div>

				

					<Elements stripe={stripePromise}>
						<CheckoutForm />
					</Elements>

				
				</div>
			</div>
		</div>
	)
}

export default Payment
