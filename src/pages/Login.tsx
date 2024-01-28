import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

type loginProps = {
	layout: string
}

const Login = ({ layout }: loginProps): ReactElement => {
	const [email, setEmail] = useState('')
	const [p1, setP1] = useState('')
	const [submit, setSubmit] = useState(false)
	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)

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
		setP1(value)
	}

	const handleSubmit = (event: React.MouseEvent<HTMLFormElement>): void => {
		event.preventDefault()
		if (email === '') {
			setAlert('email is require !')
			setSubmit(false)
		} else if (p1.length < 6) {
			setAlert('7 charachers minimum !')
			setSubmit(false)
			setShake(true)
			setTimeout(() => {
				setShake(false)
			}, 1000)
		} else {
			setAlert('')

			const fetchData = async () => {
				try {
					const {
						data,
					} = await axios.post(
						'https://site--backend-vinted--cfvhczrj5zks.code.run/user/login',
						{ email: email, password: p1 }
					)
					console.log('response>>>>>>>', data)
					setConnection(data)
					Cookies.set('token', data.token, { expires: 1 })
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
			fetchData()
		}
	}
	console.log('connection>>>', connection)
	return (
		<div className={layout}>
			<div className="text-lg text-gray-600 "> Se connecter</div>
			<motion.form
				className="flex flex-col my-2 w-1/3 max-md:w-2/3"
				animate={{ scale: submit ? 0 : 1 }}
				initial={{ scale: 0.9 }}
				transition={{ type: 'spring', bounce: 0.6 }}
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

				<motion.input
					type="password"
					placeholder="Mot de passe"
					name="p1"
					value={p1}
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

				<motion.button
					whileTap={{ scale: 0.98 }}
					className="mt-8 mb-4 border-none rounded bg-blue-vinted text-white py-2 "
				>
					Se connecter
				</motion.button>
				<Link
					className="flex justify-center text-xs text-blue-vinted"
					to={`/user/signup`}
				>
					Pas encore de compte ? Inscris-toi !
				</Link>
			</motion.form>
		</div>
	)
}

export default Login
