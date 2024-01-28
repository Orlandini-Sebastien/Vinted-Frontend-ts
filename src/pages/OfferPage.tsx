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
		<div className=" h-full  bg-[#EBEDEE]">
			<div
				className=" lg:justify-around mt-20 flex 
			max-lg:flex-col max-lg:items-center"
			>
				<img
					className="my-20 max-lg:w-11/12 lg:w-[30%] object-cover"
					src={offer.product_image}
					alt="image"
				/>

				<div className="my-20 max-lg:w-11/12 max-lg:my-10 px-2 lg:w-[30%] bg-white ">
					<div className="h-1/3">
						<div className="text-2xl my-3">{offer.product_price} €</div>
						<div className="flex flex-col justify-between"></div>
					</div>

					<div className="h-1/5">
						<div className="text-gray-800 font-bold mt-8 my-2">
							{offer.product_name}
						</div>
						<div className="text-gray-600">{offer.product_description}</div>
					</div>

					<div className=" flex items-center my-4">
						<img
							className="p-1 w-10 h-10 object-fill rounded-full"
							src={offer.owner?.account?.avatar?.secure_url}
						/>
						<div className="p-1 text-xs">{offer.owner.account?.username}</div>
					</div>

					<button className="w-full bg-blue-vinted rounded-md text-white h-10 my-20">
						Acheter
					</button>
				</div>
			</div>
		</div>
	)
}

export default OfferPage
