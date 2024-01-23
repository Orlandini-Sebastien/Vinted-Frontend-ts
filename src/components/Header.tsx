import { Link } from 'react-router-dom'
const Header = () => {
	return (
		<header className="bg-white">
			<header className="flex w-5/6 m-auto py-4 items-center">
				<Link to={`/`}>
					<img
						className="flex p-2 w-24 object-fill"
						src="../vinted.webp"
						alt="logo"
					/>
				</Link>

				<input
					className="p-2 m-2 w-1/2  bg-slate-100 rounded-md text-xs "
					type="text"
					placeholder="Recherche des articles"
				/>
				<button className="text-blue-vinted border-blue-vinted border rounded-md p-2 m-2 w-40 text-xs">
					S'inscrire
				</button>
				<button className="text-blue-vinted  border-blue-vinted border rounded-md p-2 m-2 w-40 text-xs">
					Se connecter
				</button>
				<button className="bg-blue-vinted  rounded-md p-2 m-2 text-white w-40 text-xs">
					Vends tes articles
				</button>
			</header>
		</header>
	)
}

export default Header
