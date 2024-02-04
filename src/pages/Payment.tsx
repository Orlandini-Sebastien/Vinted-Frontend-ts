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
	const protection_acheteur: number = 0.4
	const frais_port: number = 0.8
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
					url: `https://site--backend-vinted--cfvhczrj5zks.code.run/offer/payment`,
				})

				console.log(data)
			} catch (e) {
				const error = e as AxiosError

				console.log('catch app>>>', error.response)
				if (error.response?.status === 401) {
					navigate('/', { state: { path: 'offer/publish' } })
					setDisplayLogin(true)
				}
			}
		}
		fetchData()
	}, [])

	return (
		<div className="h-[85vh] bg-[#EBEDEE]  ">
			<div className="flex justify-center  items-center  h-full">
				<div className="max-lg:w-[70%] p-4 lg:w-[40%] lg:h-[70%]  bg-white flex flex-col justify-around  ">
					<div className="h-[10%] text-gray-400">Résumé de la commande</div>
					<div className="h-[20%] text-gray-500">
						<div className="flex justify-between">
							Commande <span> {data.state.price} €</span>
						</div>
						<div className="flex justify-between">
							Frais de protection acheteurs
							<span> {protection_acheteur} € </span>
						</div>
						<div className="flex justify-between  ">
							Frais de port <span> {frais_port} € </span>
						</div>
					</div>

					<div className="h-[20%] font-bold flex justify-between items-center">
						Total
						<span>{data.state.price + protection_acheteur + frais_port} €</span>
					</div>
					<div className="h-[20%]">
						Il ne vous reste plus qu'une étape pour vous offrir{' '}
						<span className="font-bold ">{data.state.product_name}</span>. Vous
						allez payer
						<span className="font-bold">
							{data.state.price + protection_acheteur + frais_port} €
						</span>
						(frais de protection et frais de port inclus).
					</div>

					<div className="h-[10%]">Viens mettre ta carte</div>

					<Elements stripe={stripePromise}>
						<CheckoutForm />
					</Elements>

					<button className="h-[10%] bg-green-500 rounded text-white">
						Payer
					</button>
				</div>
			</div>
		</div>
	)
}

export default Payment
