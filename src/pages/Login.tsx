import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Cookies from 'js-cookie'

const Login = () => {
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
						data
					} = await axios.post(
						'https://site--backend-vinted--cfvhczrj5zks.code.run/user/login',
						{ email: email, password: p1 }
					)
					console.log('response>>>>>>>', data)
                    setConnection(data)
					Cookies.set('token', data.token, { expires: 1 })

					

				} catch (error) {
					console.log('catch app>>>', error.response.data.message)
					setAlert(error.response.data.message)
				}
			}
			fetchData()
            
		}
	}
	console.log('connection>>>', connection)
	return (
		<div className="h-[80vh] w-screen flex justify-center items-center">
			<motion.form
				className="flex flex-col my-2 w-1/3 max-md:w-2/3"
				animate={{ scale: submit ? 0 : 1 }}
				initial={{ scale: 0.9 }}
				transition={{ type: 'spring', bounce: 0.6 }}
				onSubmit={handleSubmit}
			>
				<label className="my-2">Email</label>
				<input
					type="email"
					placeholder="sebi@gmail.com"
					name="email"
					value={email}
					onChange={handleEmailChange}
					className=" bg-slate-200 leading-4 border-none rounded"
				/>

				<label className="my-2">Password</label>

				<motion.input
					type="password"
					placeholder="azerty"
					name="p1"
					value={p1}
					onChange={handlePasswordChange}
					className={` ${
						alert === '7 charachers minimum !' ? 'borderRed' : ''
					}  ${
						shake ? 'shake' : ''
					}  bg-slate-200 leading-4 border-none rounded w-full `}
				/>

				<p className="text-red-500 my-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
					{alert}
				</p>

				<motion.button
					whileTap={{ scale: 0.98 }}
					className="my-8 border-none rounded bg-blue-vinted text-white "
				>
					Se connecter
				</motion.button>
			</motion.form>
		</div>
	)
}

export default Login
