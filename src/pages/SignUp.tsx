import '../App.css'

import { ReactElement, useState } from 'react'

import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

type SignUpProps = {
	setToken: React.Dispatch<React.SetStateAction<string>>
	layoutSignUp: string
	styleSignUp: string
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignUp({
	setDisplayLogin,
	setDisplaySignUp,
	setToken,
	layoutSignUp,
	styleSignUp,
}: SignUpProps): ReactElement {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [newsletter, setNewsletter] = useState(false)
	const [avatar, setAvatar] = useState<File | null>(null)
	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)

	const location = useLocation()
	const navigate = useNavigate()
	console.log('location >>>', location.state)

	const handleNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setName(value)
	}
	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setEmail(value)
	}
	const handleP1Change = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value
		setPassword(value)
	}

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setAvatar(event.target.files[0])
		}
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (name === '') {
			setAlert('Le nom est obligatoire !')
		} else if (email === '') {
			setAlert("L'email est obligatoire !")
		} else if (password.length < 6) {
			setAlert('7 charachères minimum !')
			setShake(true)
			setTimeout(() => {
				setShake(false)
			}, 1000)
		} else {
			setAlert('')

			if (name && email && password) {
				let newslettertoString: string = ''
				if (newsletter) {
					newslettertoString = newslettertoString + '1'
				} else newslettertoString += '0'

				const formData = new FormData()
				formData.append('username', name)
				formData.append('email', email)
				formData.append('password', password)
				formData.append('newsletter', newslettertoString)
				if (avatar) {
					formData.append('avatar', avatar)
				}

				try {
					const { data } = await axios.post(
						'https://site--backend-vinted--cfvhczrj5zks.code.run/user/signup',
						formData
					)
					console.log('response', data)
					Cookies.set('userToken', data.token, { expires: 1, secure: true })
					setToken(data.token)
					setDisplaySignUp(false)
					if (location.state.path)
						navigate(location.state.path, {
							state: {
								price: location.state.price,
								product_name: location.state.product_name,
							},
						})
				} catch (e) {
					const error = e as AxiosError

					console.log('catch app>>>', error.response?.status)
					if (error.response?.status === 400) {
						setAlert("L'email est déjà enregistré")
					}
				}
			}
		}
	}

	return (
		<>
			<section className={layoutSignUp}>
				<div className="w-full h-[0%] flex justify-end">
					<button onClick={() => setDisplaySignUp(false)} className="mx-4">
						✖️
					</button>
				</div>
				<div className="text-lg text-gray-600"> S'inscrire</div>

				<form onSubmit={handleSubmit} className={styleSignUp}>
					<input
						type="text"
						placeholder="Nom d'utilisateur"
						name="name"
						value={name}
						onChange={handleNameChange}
						className=" bg-white   border-b-2 leading-8  flex w-full text-blue-vinted"
					/>
					<div
						className={
							avatar
								? 'flex justify-around items-center '
								: 'flex justify-center items-center '
						}
					>
						<label
							className="text-gray-400 hover:text-white w-1/2 border-2 border-solid border-gray-300 flex justify-center items-center hover:bg-blue-vinted/50"
							htmlFor="avatar"
						>
							Avatar
						</label>
						{avatar && (
							<img
								className="h-8 w-8 rounded-full object-cover "
								src={URL.createObjectURL(avatar)}
								alt="avatar"
							/>
						)}
						<input
							className=" bg-white  leading-8  flex  text-blue-vinted w-0"
							type="file"
							id="avatar"
							name="avatar"
							onChange={handleAvatarChange}
						/>
					</div>

					<input
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						className=" bg-white leading-8 border-b-2 border-red-200 flex w-full text-blue-vinted"
					/>

					<input
						type="password"
						placeholder="Mot de passe"
						name="p1"
						value={password}
						onChange={handleP1Change}
						className={` ${
							alert === 'passwords are not the same' ||
							alert === '7 charachers minimum !'
								? 'borderRed'
								: ''
						}  ${
							shake ? 'shake' : ''
						}  bg-white  border-b-2 rounded w-full leading-8 `}
					/>
					<div className="flex flex-col">
						<div className="flex   text-gray-500">
							<input
								className="mr-4 flex "
								type="checkbox"
								id="check"
								checked={newsletter}
								onChange={() => setNewsletter(!newsletter)}
							/>
							<label htmlFor="check">S'inscrire à notre new's Letter</label>
						</div>
						<div className="text-gray-400 text-xs">
							En m'inscrivant je confirme avoir lu et accepté les Termes &
							Conditions et Politiques de Confidentialités de My Vinted. Je
							confirme avoir au moins 18 ans.
						</div>
					</div>

					<p className="text-red-500  sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
						{alert}
					</p>
					<button className=" mb-4 border-none rounded bg-blue-vinted text-white py-2 w-full">
						S'inscrire
					</button>
					<button
						className="flex justify-center text-xs text-blue-vinted w-full"
						onClick={() => {
							setDisplayLogin(true)
							setDisplaySignUp(false)
						}}
					>
						Tu as déjà un compte ? Connecte-toi !
					</button>
				</form>
			</section>
		</>
	)
}
