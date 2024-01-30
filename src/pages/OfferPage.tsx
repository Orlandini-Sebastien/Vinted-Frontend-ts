import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const OfferPage = () => {
	const { id } = useParams()

	const [isLoading, setIsLoading] = useState(true)
	const [offer, setOffer] = useState({
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
		product_details: [
			{ MARQUE: '' },
			{ TAILLE: '' },
			{ ÉTAT: '' },
			{ COULEUR: '' },
			{ EMPLACEMENT: '' },
		],
		product_image: '',

		product_name: '',
		product_pictures: [],
		product_price: 0,
		_id: '',
	})
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(
					`https://site--backend-vinted--cfvhczrj5zks.code.run/offer/${id}`
				)
				console.log('offer data >>>', data)
				setOffer(data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [])

	console.log('data>>>', offer)
	return isLoading ? (
		<p>Is Loading</p>
	) : (
		<div className="lg:h-[85vh] bg-[#EBEDEE]">
			<div
				className=" lg:justify-around  flex 
			max-lg:flex-col max-lg:items-center "
			>
				<img
					className="lg:my-20 max-lg:my-8 max-lg:w-11/12 lg:w-[30%] lg:h-[64vh] object-cover "
					src={offer.product_image}
					alt="image"
				/>

				<div className="flex flex-col justify-around my-20 max-lg:w-11/12 max-lg:my-2 px-2 lg:w-[30%] lg:h-[64vh]  bg-white ">
					<div className="text-2xl my-3">{offer.product_price} €</div>
					<div className="flex justify-between">
						<span className="text-gray-400">MARQUE</span>{' '}
						<span className="text-gray-600">
							{offer.product_details[0].MARQUE}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-400">TAILLE</span>{' '}
						<span className="text-gray-600">
							{offer.product_details[1].TAILLE}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-400">ÉTAT</span>{' '}
						<span className="text-gray-600">
							{offer.product_details[2].ÉTAT}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-400">COULEUR</span>{' '}
						<span className="text-gray-600">
							{offer.product_details[3].COULEUR}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-400">EMPLACEMENT</span>{' '}
						<span className="text-gray-600">
							{offer.product_details[4].EMPLACEMENT}
						</span>
					</div>

					<div className="text-gray-800 font-bold mt-4 my-2">
						{offer.product_name}
					</div>
					<div className="text-gray-600">{offer.product_description}</div>

					<div className=" flex items-center my-4 ">
						<img
							className="p-1 w-10 h-10 object-fill rounded-full"
							src={offer.owner?.account?.avatar?.secure_url}
						/>
						<div className="p-1 text-xs">{offer.owner.account?.username}</div>
					</div>

					<button className="w-full bg-blue-vinted rounded-md text-white h-10 ">
						Acheter
					</button>
				</div>
			</div>
		</div>
	)
}

export default OfferPage
