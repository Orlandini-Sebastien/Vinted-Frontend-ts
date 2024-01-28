import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'



type SignUpProps = {
	setToken: React.Dispatch<React.SetStateAction<string>>
}

export default function SignUp({ setToken }: SignUpProps): ReactElement {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [newsletter, setNewsletter] = useState(false)

	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)

	const navigate = useNavigate()

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

	const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (name === '') {
			setAlert('Le nom est obligatoire !')
		} else if (email === '') {
			setAlert('L\'email est obligatoire !')
		} else if (password.length < 6) {
			setAlert('7 charachers minimum !')
			setShake(true)
			setTimeout(() => {
				setShake(false)
			}, 1000)
		} else {
			setAlert('')

			try {
				if (name && email && password) {
					const { data } = await axios.post(
						'https://site--backend-vinted--cfvhczrj5zks.code.run/user/signup',
						{
							username: name,
							email: email,
							password: password,
							newsletter: newsletter,
						}
					)
					console.log('response', data)
					Cookies.set('userToken', data.token, { expires: 1, secure: true })
					setToken(data.token)
					navigate('/')
				}
			} catch (e) {
				const error = e as AxiosError;
			
				console.log('catch app>>>', error.response?.status)
				if(error.response?.status === 400){
					setAlert("L'email est déjà enregistré")
				}
				
			}
		}
	}

	return (
		<>
			<section className="flex flex-col justify-center leading-4 font-semibold w-full my-2 sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl h-[80vh] items-center">
				<div className="text-lg text-gray-600"> S'inscrire</div>

				<motion.form
					animate={{ scale: 1 }}
					initial={{ scale: 0.9 }}
					transition={{ type: 'spring', bounce: 0.6 }}
					onSubmit={handleSubmit}
					className="flex flex-col my-2 w-1/3 max-md:w-2/3"
				>
					<input
						type="text"
						placeholder="Nom d'utilisateur"
						name="name"
						value={name}
						onChange={handleNameChange}
						className=" bg-white  border-b-2 leading-8 my-4"
					/>

					<input
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						className=" bg-white leading-8 border-b-2 border-red-200  my-4"
					/>

					<motion.input
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
						}  bg-white  border-b-2 rounded w-full leading-8 my-4`}
					/>
					<div className="flex flex-col">
						<div className="flex  my-4 text-gray-500">
							<input
								className="mr-4 "
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

					<p className="text-red-500 my-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
						{alert}
					</p>
					<motion.button
						whileTap={{ scale: 0.98 }}
						className="mt-8 mb-4 border-none rounded bg-blue-vinted text-white py-2 "
					>
						S'inscrire
					</motion.button>
					<Link
						className="flex justify-center text-xs text-blue-vinted"
						to={`/user/login`}
					>
						Tu as déjà un compte ? Connecte-toi !
					</Link>
				</motion.form>
			</section>
		</>
	)
}
