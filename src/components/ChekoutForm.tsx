
import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const CheckoutForm = () => {
	const stripe = useStripe()
	const elements = useElements()

	const [completed, setCompleted] = useState(false)

	const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
		// On récupère ici les données bancaires que l'utilisateur rentre

		if (elements !== null) {
			const cardElement = elements.getElement(CardElement)
			if (stripe !== null) {
				if (cardElement !== null) {
					const stripeResponse = await stripe.createToken(cardElement, {
						name: "L'id de l'acheteur",
					})
					console.log(stripeResponse)
					if (stripeResponse.token !== undefined) {
						const stripeToken = stripeResponse.token.id
						const response = await axios.post('https://site--backend-vinted--cfvhczrj5zks.code.run/payment', {
							stripeToken,
						})
						console.log(response.data)
						if (response.data.status === 'succeeded') {
							setCompleted(true)
						}
					}
				}
			}
		}
	}

	return (
		<>
			{!completed ? (
				<form className='h-[20%] flex flex-col justify-around' onSubmit={handleSubmit}>
					<CardElement />
					<button className="  w-full bg-green-500 rounded text-white" type="submit">Valider</button>
				</form>
			) : (
				<span>Paiement effectué ! </span>
			)}
		</>
	)
}

export default CheckoutForm
