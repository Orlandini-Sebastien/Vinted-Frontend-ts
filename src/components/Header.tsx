import { Link } from 'react-router-dom'
import vinted from '../assets/Vinted_logo.png'
import { ReactElement } from 'react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import axios from 'axios'

/* type HeaderProps = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}{ visible, setVisible }: HeaderProps  */

type HeaderProps = {
	token: string
	setToken: React.Dispatch<React.SetStateAction<string>>
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
	setData: React.Dispatch<React.SetStateAction<never[]>>
}

const Header = ({
	token,
	setToken,
	setDisplayLogin,
	setDisplaySignUp,
	setData,
}: HeaderProps): ReactElement => {
	const [searchOffer, setSearchOffer] = useState('')
	const [hiddeSort, setHiddeSort] = useState(true)
	const [croissant, setCroissant] = useState(false)
	
	const handleSearchOffer = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value
		setSearchOffer(value)
		console.log('la value >>>', value)

		try {
			const response = await axios.get(
				`https://site--backend-vinted--cfvhczrj5zks.code.run/offers?sort=${croissant?"asc":"desc"}&product_name=${value}`
			)
			setData(response.data)
			console.log('la reponse header', response.data)
		} catch (error) {
			console.log('catch app>>>', error)
		}
	}
	const handleSort = async() => {
		try {
			const response = await axios.get(
				`https://site--backend-vinted--cfvhczrj5zks.code.run/offers?sort=${croissant?"asc":"desc"}`
			)
			setData(response.data)
			console.log('la reponse header', response.data)
		} catch (error) {
			console.log('catch app>>>', error)
		}
	}



	return (
		<header className="bg-white h-[25vh] flex ">
			<header className="flex justify-center  max-lg:flex-wrap md:w-4/5 max-md:w-11/12 m-auto py-2 items-center ">
				<div className="w-full  flex-row flex relative">
					<Link to={`/`}>
						<img
							className="flex p-2 w-24 object-fill"
							src={vinted}
							alt="logo"
						/>
					</Link>

					<input
						className="p-2 m-2 flex-1  bg-slate-100 rounded-md text-xs text-blue-vinted font-bold"
						type="text"
						placeholder="Recherche des articles"
						value={searchOffer}
						onChange={handleSearchOffer}
					/>
					<button
						onClick={() => {
							setHiddeSort(!hiddeSort)
						}}
						className="bg-white hover:bg-blue-vinted/50 rounded absolute right-4 top-1/4  border-2 border-solid hover:border-blue-vinted border-gray-500"
					>
						Trier par ⬇️
					</button>

					<div className={(hiddeSort)? 'hidden' : ''}>
						<div className="bg-white p-2 my-2 absolute max-lg:z-20 max-md:right-4 md:-right-12 top-3/4 border border-solid border-gray-400">
							<div className="flex justify-between">
								Prix décroissant
								<div>
									<span onClick={()=> { setCroissant(!croissant);
									handleSort();
									}} className={croissant? "hidden" : ""}  >⚪</span> <span onClick={()=> { setCroissant(!croissant); 	handleSort();}} className={!croissant? "hidden" : ""} >⚫</span>
								</div>
							</div>
							<div className="flex justify-between">
								Prix croissant
								<div>
									<span onClick={()=> { setCroissant(!croissant); handleSort()}} className={!croissant? "hidden" : ""} >⚪</span> <span onClick={()=> { setCroissant(!croissant);handleSort()}} className={croissant? "hidden" : ""}>⚫</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<nav className="max-md:w-full justify-center flex">
					{token ? (
						<button
							className="bg-red-400 rounded-md p-2 text-xs "
							onClick={() => {
								Cookies.remove('userToken')
								setToken('')
							}}
						>
							Se déconnecter
						</button>
					) : (
						<>
							<button
								onClick={() => setDisplaySignUp(true)}
								className="text-blue-vinted border-blue-vinted border border-solid rounded-md p-2 md:m-2 max-md:m-1 w-40 text-xs max-md:w-[31%] flex justify-center items-center"
							>
								S'inscrire
							</button>

							<button
								onClick={() => setDisplayLogin(true)}
								className="text-blue-vinted border-solid border-blue-vinted border rounded-md p-2 md:m-2 max-md:m-1 w-40 text-xs max-md:w-[31%] flex justify-center items-center"
							>
								Se connecter
							</button>
							<button className="bg-blue-vinted  rounded-md p-2 md:m-2 max-md:m-1 text-white w-40 text-xs max-md:w-[31%]">
								Vends tes articles
							</button>
						</>
					)}
				</nav>
			</header>
		</header>
	)
}

export default Header
