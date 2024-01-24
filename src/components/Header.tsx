import { Link } from 'react-router-dom'
import vinted from '../assets/vinted.webp'
const Header = () => {
	return (
		<header className="bg-white">
			<header className="flex max-md:flex-wrap md:w-5/6 max-md:11/12 m-auto py-4 items-center">
				<Link to={`/`}>
					<img
						className="flex p-2 w-24 object-fill"
						src={vinted}
						alt="logo"
					/>
				</Link>

				<input
					className="p-2 m-2 w-1/2  bg-slate-100 rounded-md text-xs "
					type="text"
					placeholder="Recherche des articles"
				/>
				<button className="text-blue-vinted border-blue-vinted border rounded-md p-2 md:m-2 max-md:m-1 w-40 text-xs max-md:w-[31%]">
					S'inscrire
				</button>
				<button className="text-blue-vinted  border-blue-vinted border rounded-md p-2 md:m-2 max-md:m-1 w-40 text-xs max-md:w-[31%]">
					Se connecter
				</button>
				<button className="bg-blue-vinted  rounded-md p-2 md:m-2 max-md:m-1 text-white w-40 text-xs max-md:w-[31%]">
					Vends tes articles
				</button>
			</header>
		</header>
	)
}

export default Header
