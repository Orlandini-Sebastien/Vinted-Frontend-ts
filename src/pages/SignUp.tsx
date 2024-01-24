import '../App.css'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faEye, faEyeSlash)

function App() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [p1, setP1] = useState('')
	const [p2, setP2] = useState('')

	const [hideP1, sethideP1] = useState(true)
	const [hideP2, sethideP2] = useState(true)
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
	const handleP2Change = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value
		setP2(value)
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
		} else if (p1 !== p2) {
			setAlert('passwords are not the same')
			setSubmit(false)
			setShake(true)
			setTimeout(() => {
				setShake(false)
			}, 1000)
		} else {
			setAlert('')
			setSubmit((prev) => !prev)
		}
	}
	const handleHideP1 = () => {
		sethideP1((prev) => !prev)
	}
	const handleHideP2 = () => {
		sethideP2((prev) => !prev)
	}
	const handleReturn = () => {
		setSubmit(false)
	}
	return (
		<>
			<section className="flex justify-center leading-4 flex-row font-semibold w-full my-2 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl h-[80vh] items-center">
				{name !== '' && email !== '' && p1.length > 6 && p1 === p2 && submit ? (
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
						<label className="my-2">Name</label>
						<input
							type="text"
							placeholder="My name"
							name="name"
							value={name}
							onChange={handleNameChange}
							className=" bg-slate-200 leading-4 border-none rounded"
						/>
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
						<div className="relative ">
							<motion.input
								type={hideP1 ? 'password' : 'text'}
								placeholder="azerty"
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
								}  bg-slate-200 leading-4 border-none rounded w-full `}
							/>
							<FontAwesomeIcon
								icon={hideP1 ? 'eye' : 'eye-slash'}
								onClick={handleHideP1}
								className="absolute top-1.5 right-2 "
							/>
						</div>

						<label className="my-2">Confirm your Password</label>
						<div className="relative">
							<input
								type={hideP2 ? 'password' : 'text'}
								placeholder="azerty"
								name="p2"
								value={p2}
								onChange={handleP2Change}
								className={` ${
									alert === 'passwords are not the same' ||
									alert === '7 charachers minimum !'
										? 'borderRed'
										: ''
								}  ${
									shake ? 'shake' : ''
								}  bg-slate-200 leading-4 border-none rounded relative w-full `}
							/>
							<FontAwesomeIcon
								icon={hideP2 ? 'eye' : 'eye-slash'}
								onClick={handleHideP2}
								className="absolute top-1.5 right-2 "
							/>
						</div>
						<p className="text-red-500 my-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
							{alert}
						</p>
						<motion.button
							whileTap={{ scale: 0.98 }}
							className="my-8 border-none rounded bg-blue-vinted text-white "
						>
							Register
						</motion.button>
					</motion.form>
				)}
			</section>
		</>
	)
}

export default App
