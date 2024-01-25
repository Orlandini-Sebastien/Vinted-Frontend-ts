import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Cookies from 'js-cookie'

function App() {
	const [data, setData] = useState({})
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [p1, setP1] = useState('')

	const [submit, setSubmit] = useState(false)
	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)

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
		setP1(value)
	}

	const handleReturn = () => {
		setSubmit(false)
	}
	const handleSubmit = (event: React.MouseEvent<HTMLFormElement>): void => {
		event.preventDefault()
		if (name === '') {
			setAlert('name is require !')
			setSubmit(false)
		} else if (email === '') {
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
						'https://site--backend-vinted--cfvhczrj5zks.code.run/user/signup',
						{ username: name, email: email, password: p1, newsletter: false }
					)
					console.log('response', data)
					const token = data.token
					Cookies.set('token', token, { expires: 1 })
					setData(data)
				} catch (error) {
					console.log('catch app>>>', error)
				}
			}
			fetchData()
			setSubmit((prev) => !prev)
		}
	}
	console.log('the final data', data)

	return (
		<>
			<section className="flex flex-col justify-center leading-4 font-semibold w-full my-2 sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl h-[80vh] items-center">
				<div className="text-lg text-gray-600"> S'inscrire</div>
				{name !== '' && email !== '' && p1.length > 6 && submit ? (
					<motion.section
						animate={{ scale: submit ? 1 : 0 }}
						initial={{ scale: 0.9 }}
						transition={{ type: 'spring', bounce: 0.6 }}
						className="max-md:w-2/3 md:w-1/3 "
					>
						<div className="my-2 flex flex-col bg-slate-200">
							<label className="my-2">{name}</label>
							<label className="my-2">{email}</label>
							<label className="my-2">{p1}</label>
						</div>
						<motion.button
							whileTap={{ scale: 0.98 }}
							onClick={handleReturn}
							className="flex justify-center my-8 border-none rounded bg-blue-vinted text-white w-full"
						>
							Edit your information
						</motion.button>
					</motion.section>
				) : (
					<motion.form
						animate={{ scale: submit ? 0 : 1 }}
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
							value={p1}
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
								<input className="mr-4 " type="checkbox" />
								<div>S'inscrire à notre new's Letter</div>
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
							{' '}
							Tu as déjà un compte ? Connecte-toi !
						</Link>
					</motion.form>
				)}
			</section>
		</>
	)
}

export default App
