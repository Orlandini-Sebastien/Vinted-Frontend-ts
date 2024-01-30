const OfferPublish = () => {
	return (
		<div className="bg-gray-100 ">
			<div className="max-md:w-11/12 md:w-5/6 m-auto flex flex-col h-[85vh] justify-evenly">
				<div className="h-[5%] ">Vends ton article</div>
				<div className="bg-white h-[20%] flex justify-center items-center">
					Ajoute une photo
				</div>
				<div className="bg-white h-[20%] flex flex-col">
					<div className="flex w-full h-1/3 border-solid border-b border-gray-200">
						<label htmlFor="title" className="w-1/2 items-center flex p-3">
							Titre
						</label>
						<input
							className="w-1/2"
							placeholder="ex: Chemise Sézane verte"
							id="title"
						/>
					</div>

					<div className="flex w-full h-2/3 ">
						<label htmlFor="description" className="w-1/2 p-3">
							Décris ton acticle
						</label>
						<input
							className="w-1/2"
							placeholder="ex: Portée quelquefois, taille correctement"
							id="description"
						/>
					</div>
				</div>
				<div className="bg-white h-[30%] ">
					<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
						<label htmlFor="brand" className="w-1/2 items-center flex p-3">
							Marque
						</label>
						<input className="w-1/2" placeholder="ex: Zara" id="brand" />
					</div>
					<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
						<label htmlFor="size" className="w-1/2 items-center flex p-3">
							Taille
						</label>
						<input className="w-1/2" placeholder="ex: L / 40 / 12" id="size" />
					</div>
					<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
						<label htmlFor="color" className="w-1/2 items-center flex p-3">
							Couleur
						</label>
						<input className="w-1/2" placeholder="ex: Fushia" id="color" />
					</div>
					<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
						<label htmlFor="stat" className="w-1/2 items-center flex p-3">
							Etat
						</label>
						<input
							className="w-1/2"
							placeholder="ex: Neuve avec étiquette"
							id="stat"
						/>
					</div>
					<div className="flex w-full h-1/5 border-solid border-b border-gray-200">
						<label htmlFor="where" className="w-1/2 items-center flex p-3">
							Lieu
						</label>
						<input className="w-1/2" placeholder="ex: Paris" id="where" />
					</div>
				</div>
				<div className="bg-white h-[10%] ">
					<div className="flex w-full h-1/3 ">
						<label htmlFor="price" className="w-1/2 items-center flex p-3">
							Prix
						</label>
						<input className="w-1/2" placeholder="ex: Paris" id="price" />
					</div>
					<div className="flex w-full h-2/3">
						<label className="w-1/2 items-center flex p-3"></label>
						<div className="w-1/2">Je suis intéressé(e) par les échanges</div>
					</div>
				</div>
				<button className="flex justify-end">Ajouter</button>
			</div>
		</div>
	)
}

export default OfferPublish
