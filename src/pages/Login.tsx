import { ReactElement, useState } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

type loginProps = {
	layout: string
	setToken: React.Dispatch<React.SetStateAction<string>>
}

const Login = ({ layout, setToken }: loginProps): ReactElement => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)
	const navigate = useNavigate()

	const [connection, setConnection] = useState({})

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
					'https://site--backend-vinted--cfvhczrj5zks.code.run/user/login',
					{ email: email, password: password }
				)
				console.log('response>>>>>>>', data)
				setConnection(data)
				Cookies.set('token', data.token, { expires: 1 })
				setToken(data.token)
				navigate('/')
			} catch (e) {
				console.log('error >>>>', e)

				if (typeof e === 'string') {
					e.toUpperCase() // works, `e` narrowed to string
					setAlert(e)
				} else if (e instanceof Error) {
					e.message // works, `e` narrowed to Error
				}
			}
		}
	}
	console.log('connection>>>', connection)
	return (
		<div className={layout}>
			<div className="text-lg text-gray-600 "> Se connecter</div>
			<form
				className="flex flex-col my-2 w-1/3 max-md:w-2/3"
				onSubmit={handleSubmit}
			>
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

				<p className="text-red-500 my-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
					{alert}
				</p>

				<button className="mt-8 mb-4 border-none rounded bg-blue-vinted text-white py-2 ">
					Se connecter
				</button>
				<Link
					className="flex justify-center text-xs text-blue-vinted"
					to={`/user/signup`}
				>
					Pas encore de compte ? Inscris-toi !
				</Link>
			</form>
		</div>
	)
}

export default Login
