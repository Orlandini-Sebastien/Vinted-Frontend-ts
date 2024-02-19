import { ReactElement, useState } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

type loginProps = {
	layout: string
	styleForm: string
	setToken: React.Dispatch<React.SetStateAction<string>>
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({
	styleForm,
	layout,
	setToken,
	setDisplayLogin,
	setDisplaySignUp,
}: loginProps): ReactElement => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)

	const [connection, setConnection] = useState({})

	const location = useLocation()
	const navigate = useNavigate()
	console.log('location >>>', location.state)

	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setEmail(value)
	}
	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setPassword(value)
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (email === '') {
			setAlert("L'email est obligatoire !")
		} else if (password.length < 6) {
			setAlert('7 charachères minimum !')
			setShake(true)
			setTimeout(() => {
				setShake(false)
			}, 1000)
		} else {
			setAlert('')
			try {
				const {
					data,
				} = await axios.post(
					'http://site--backend-vinted--cfvhczrj5zks.code.run/user/login',
					{ email: email, password: password }
				)
				console.log('response>>>>>>>', data)
				setConnection(data)
				Cookies.set('userToken', data.token, { expires: 1 })
				setToken(data.token)
				setDisplayLogin(false)
				if (location.state.path)
					navigate(location.state.path, {
						state: {
							price: location.state.price,
							product_name: location.state.product_name,
						},
					})
			} catch (e) {
				console.log('error >>>>', e)
				const error = e as AxiosError

				console.log('catch app>>>', error.response?.status)
				if (error.response?.status === 401) {
					setAlert("L'email n'existe pas")
				}
			}
		}
	}
	console.log('connection>>>', connection)
	return (
		<div className={layout}>
			<div className="w-full flex h-[0%] justify-end">
				<button onClick={() => setDisplayLogin(false)} className="mx-4">
					✖️
				</button>
			</div>

			<div className="text-lg text-gray-600 h-1/6 "> Se connecter</div>

			<form className={styleForm} onSubmit={handleSubmit}>
				<div className="h-1/2 flex flex-col justify-center">
					<input
						type="email"
						placeholder="Adresse email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						className=" bg-white text-blue-vinted  border-b-2 rounded w-full leading-8 my-4"
					/>

					<input
						type="password"
						placeholder="Mot de passe"
						name="p1"
						value={password}
						onChange={handlePasswordChange}
						className={` ${
							alert === '7 charachers minimum !' ? 'borderRed' : ''
						}  ${
							shake ? 'shake' : ''
						}  bg-white  border-b-2 border-red-200  rounded w-full leading-8 my-4 `}
					/>
				</div>

				<div className="h-1/4 flex flex-col ">
					<p className="text-red-500 my-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
						{alert}
					</p>

					<button className="mt-8 mb-4 border-none rounded bg-blue-vinted text-white py-2 flex w-full justify-center">
						Se connecter
					</button>
					<button
						className="flex justify-center text-xs text-blue-vinted w-full"
						onClick={() => {
							setDisplayLogin(false)
							setDisplaySignUp(true)
						}}
					>
						Pas encore de compte ? Inscris-toi !
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
