import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
					`http://site--backend-vinted--cfvhczrj5zks.code.run/offer/${id}`
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
		<div className="lg:h-[85vh]  bg-[#EBEDEE]">
			<div
				className=" lg:justify-around  flex items-center
			max-lg:flex-col  h-full "
			>
				<div className="lg:my-20 max-lg:my-8 max-lg:w-[70%] lg:w-[40%] h-[70%] max-lg:py-4   ">
					<img
						className="w-full h-full object-cover "
						src={offer.product_image}
						alt="image"
					/>
				</div>

				<div className="flex  flex-col justify-evenly  max-lg:w-[70%] max-lg:my-8  px-2 lg:w-[40%] h-[70%] max-lg:py-4    bg-white ">
					<div className="text-2xl h-[10%]">{offer.product_price} €</div>
					<div className="h-[30%] flex flex-col justify-evenly">
						<div className="flex justify-between ">
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
					</div>

					<div className="h-[30%] max-lg:h-[70%] flex flex-col justify-center">
						<div className="text-gray-800 font-bold">{offer.product_name}</div>
						<div className="text-gray-600">{offer.product_description}</div>
					</div>

					<div className=" flex items-center h-[10%]">
						<img
							className="p-1 w-10 h-10 object-cover rounded-full"
							src={offer.owner?.account?.avatar?.secure_url}
						/>
						<div className="p-1 text-xs">{offer.owner.account?.username}</div>
					</div>

					<Link
						to="/payment"
						className="w-full bg-blue-vinted rounded-md text-white h-[10%] flex justify-center items-center "
						state={{
							price: offer.product_price,
							product_name: offer.product_name,
						}}
					>
						Acheter
					</Link>
				</div>
			</div>
		</div>
	)
}

export default OfferPage
