import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

type OfferPublishProps = {
	token: string
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const OfferPublish = ({ token, setDisplayLogin }: OfferPublishProps) => {
	const navigate = useNavigate()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [brand, setBrand] = useState('')
	const [size, setSize] = useState('')
	const [color, setColor] = useState('')
	const [stat, setStat] = useState('')
	const [where, setWhere] = useState('')
	const [price, setPrice] = useState('')
	const [image, setImage] = useState<File | null>(null)
	const [subbmited, setSubmitted] = useState(false)
	const [validate, setValidate] = useState(false)

	useEffect(() => {
		if (
			subbmited &&
			title !== '' &&
			description !== '' &&
			image !== null &&
			price !== ''
		) {
			const fetchData = async () => {
				const formData = new FormData()

				formData.append('name', title)
				formData.append('description', description)
				formData.append('price', price)
				formData.append('brand', brand)
				formData.append('size', size)
				formData.append('condition', stat)
				formData.append('color', color)
				formData.append('city', where)
				if (image) {
					formData.append('files', image)
				}

				try {
					const { data } = await axios.post(
						'http://thriving-medovik-6bc46e.netlify.app/offer/publish',
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
								Authorization: `Bearer ${token}`,
							},
						}
					)
					console.log(data)
					setTitle('')
					setDescription('')
					setBrand('')
					setSize('')
					setColor('')
					setStat('')
					setWhere('')
					setPrice('')
					setImage(null)
					setValidate(true)
				} catch (e) {
					const error = e as AxiosError

					console.log('catch app>>>', error.response)
					if (error.response?.status === 401) {
						navigate('/', { state: { page: 'OfferPublish' } })
						setDisplayLogin(true)
					}
				}
			}
			fetchData()
		} else {
			const fetchData = async () => {
				try {
					const { data } = await axios.request({
						headers: {
							Authorization: `Bearer ${token}`,
						},
						method: 'POST',
						url: `http://thriving-medovik-6bc46e.netlify.app/offer/publish`,
					})

					console.log(data)
				} catch (e) {
					const error = e as AxiosError

					console.log('catch app>>>', error.response)
					if (error.response?.status === 401) {
						navigate('/', { state: { path: 'offer/publish' } })
						setDisplayLogin(true)
					}
				}
			}
			fetchData()
		}
	}, [subbmited])

	const handleTitleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setTitle(value)
	}
	const handleDescriptionChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		const value = event.target.value
		setDescription(value)
	}
	const handleBrandChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setBrand(value)
	}
	const handleSizeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setSize(value)
	}
	const handleColorChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setColor(value)
	}
	const handleStatChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setStat(value)
	}
	const handleWhereChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setWhere(value)
	}
	const handlePriceChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setPrice(value)
	}
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(event.target.files[0])
		}
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()

		setSubmitted(true)
		setTimeout(() => {
			setSubmitted(false)
			setValidate(false)
		}, 3000)
	}

	return (
		<section>
			{subbmited ? (
				<div className="flex justify-center items-center border border-solid h-[80vh] text-3xl">
					{validate
						? 'Votre annonce est bien valider !'
						: 'En cours de traitement'}
				</div>
			) : (
				<div className="bg-gray-100 ">
					<form
						onSubmit={handleSubmit}
						className="max-md:w-11/12 md:w-5/6 m-auto flex flex-col h-[85vh] justify-evenly"
					>
						<div className="h-[5%] font-bold ">Vends ton article</div>
						<div
							className={
								image
									? 'bg-white h-[20%] flex justify-around items-center'
									: 'bg-white h-[20%] flex justify-center items-center'
							}
						>
							<label
								className="text-blue-vinted w-1/2 border-2 border-solid border-blue-vinted flex justify-center items-center hover:cursor-pointer hover:bg-blue-vinted/50"
								htmlFor="image"
							>
								Ajouter une photo
							</label>
							<input
								className=" bg-white  leading-8 my-4 flex  text-blue-vinted w-0"
								type="file"
								name="image"
								id="image"
								onChange={handleImageChange}
							/>
							{image && (
								<img
									className="h-3/4"
									src={URL.createObjectURL(image)}
									alt="avatar"
								/>
							)}
						</div>
						<div className="bg-white h-[20%] flex flex-col">
							<div className="flex w-full h-1/3 border-solid border-b border-gray-200">
								<label htmlFor="title" className="w-1/2 items-center flex p-3">
									Titre
								</label>
								<input
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="ex: Chemise Sézane verte"
									id="title"
									type="text"
									name="title"
									value={title}
									onChange={handleTitleChange}
								/>
							</div>

							<div className="flex w-full h-2/3 ">
								<label htmlFor="description" className="w-1/2 p-3">
									Décris ton acticle
								</label>
								<textarea
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="ex: Portée quelquefois, taille correctement"
									id="description"
									name="description"
									value={description}
									onChange={handleDescriptionChange}
								/>
							</div>
						</div>
						<div className="bg-white h-[30%] ">
							<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
								<label htmlFor="brand" className="w-1/2 items-center flex p-3">
									Marque
								</label>
								<input
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="ex: Zara"
									id="brand"
									type="text"
									name="brand"
									value={brand}
									onChange={handleBrandChange}
								/>
							</div>
							<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
								<label htmlFor="size" className="w-1/2 items-center flex p-3">
									Taille
								</label>
								<input
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="ex: L / 40 / 12"
									id="size"
									type="text"
									name="size"
									value={size}
									onChange={handleSizeChange}
								/>
							</div>
							<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
								<label htmlFor="color" className="w-1/2 items-center flex p-3">
									Couleur
								</label>
								<input
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="ex: Fushia"
									id="color"
									type="text"
									name="color"
									value={color}
									onChange={handleColorChange}
								/>
							</div>
							<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
								<label htmlFor="stat" className="w-1/2 items-center flex p-3">
									Etat
								</label>
								<input
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="ex: Neuve avec étiquette"
									id="stat"
									type="text"
									name="stat"
									value={stat}
									onChange={handleStatChange}
								/>
							</div>
							<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
								<label htmlFor="where" className="w-1/2 items-center flex p-3">
									Lieu
								</label>
								<input
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="ex: Paris"
									id="where"
									type="text"
									name="where"
									value={where}
									onChange={handleWhereChange}
								/>
							</div>
						</div>
						<div className="bg-white h-[10%] ">
							<div className="flex w-full h-1/3 ">
								<label htmlFor="price" className="w-1/2 items-center flex p-3">
									Prix
								</label>
								<input
									className="w-1/2 placeholder:underline-offset-2 placeholder:underline"
									placeholder="1.0"
									step="0.01"
									min="0"
									id="price"
									type="number"
									name="price"
									value={price}
									onChange={handlePriceChange}
								/>
							</div>
							<div className="flex w-full h-2/3">
								<label className="w-1/2 items-center flex p-3"></label>
								<div className="w-1/2 flex items-center">
									<input type="checkbox" />
									<div className="px-2">
										Je suis intéressé(e) par les échanges
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-end">
							<button className="flex justify-center bg-blue-vinted w-20 items-center rounded text-white">
								Ajouter
							</button>
						</div>
					</form>
				</div>
			)}
		</section>
	)
}

export default OfferPublish
