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
}

const Header = ({
	token,
	setToken,
	setDisplayLogin,
	setDisplaySignUp,
}: HeaderProps): ReactElement => {
	const [searchOffer, setSearchOffer] = useState('')
	const handleSearchOffer = async(
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value
		setSearchOffer(value);
		try {
			const response = await axios.get(
				`https://site--backend-vinted--cfvhczrj5zks.code.run/offers?${searchOffer}`
			)
				console.log(response)
		} catch (error) {
			console.log('catch app>>>', error)
		}
	}

	return (
		<header className="bg-white h-[15vh]">
			<header className="flex justify-center flex-wrap md:w-4/5 max-md:w-11/12 m-auto py-2 items-center">
				<div className="max-md:w-full md:w-1/2 flex-row flex">
					<Link to={`/`}>
						<img
							className="flex p-2 w-24 object-fill"
							src={vinted}
							alt="logo"
						/>
					</Link>

					<input
						className="p-2 m-2 flex-1 w-max  bg-slate-100 rounded-md text-xs "
						type="text"
						placeholder="Recherche des articles"
						value={searchOffer}
						onChange={handleSearchOffer}
					/>
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
