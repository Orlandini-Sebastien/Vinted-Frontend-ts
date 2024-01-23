import { useEffect, useState } from 'react'
import axios from 'axios'
import Offers from '../components/Offers'

 interface Idata {
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

type HomePagePropos = {
	data: Idata
	setData: React.Dispatch<React.SetStateAction<Idata>>
}    


const HomePage = ({ data, setData }: HomePagePropos) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://site--backend-vinted--cfvhczrj5zks.code.run/offers'
				)
				setData(response.data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [])

	{
		console.log('after useeffect', data)
	}

	return isLoading ? (
		<p>Chargement en cours ...</p>
	) : (
		<div className="  relative h-scree2/3">
			<img
				className="h-full w-full object-cover"
				src="../public/banner-tablets-up-afe3d19776592a72f165c1bb93fd02c5528250a8c670ecc1656654323f9d4856.jpg"
				alt=""
			/>
			<img
				className="absolute w-full bottom-0"
				src="../public/tear.884480420945b3afd77b44a6c5f98567.svg"
				alt=""
			/>
			<div className="w-5/6 m-auto">
				<div className="absolute top-1/4 flex flex-col justify-around  bg-white h-1/2 xl:w-1/5 lg:w-2/6 md:w-1/3 max-md:w-1/3  rounded-lg p-4">
					<div className="text-2xl">
						Prêt à faire du tri dans vos placards ?
					</div>
					<button className="text-white bg-blue-vinted rounded-md py-3">
						Vends maintenant
					</button>
					<a
						className="text-blue-vinted dec"
						href="https://www.vinted.fr/how_it_works"
					>
						Découvrir comment ça marche
					</a>
				</div>
			</div>

			<Offers data={data} />
		</div>
	)
}

export default HomePage
