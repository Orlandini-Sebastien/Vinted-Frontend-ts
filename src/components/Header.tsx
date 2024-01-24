import { Link } from 'react-router-dom'
import vinted from '../assets/vinted.webp'
const Header = () => {
	return (
		<header className="bg-white">
			<header className="flex justify-center flex-wrap md:w-4/5 max-md:w-11/12 m-auto py-4 items-center">
				<div className="max-md:w-full md:w-1/2 flex-row flex">
					<Link to={`/`}>
						<img
							className="flex p-2 w-24 object-fill"
							src={vinted}
							alt="logo"
						/>
					</Link>

					<input
						className="p-2 m-2 flex-1 w-max  bg-slate-100 rounded-md text-xs "
						type="text"
						placeholder="Recherche des articles"
					/>
				</div>

				<div className="max-md:w-full justify-center flex">
					<Link to={`/user/signup`} className="text-blue-vinted border-blue-vinted border rounded-md p-2 md:m-2 max-md:m-1 w-40 text-xs max-md:w-[31%]">
						S'inscrire
					</Link>
					<button className="text-blue-vinted  border-blue-vinted border rounded-md p-2 md:m-2 max-md:m-1 w-40 text-xs max-md:w-[31%]">
						Se connecter
					</button>
					<button className="bg-blue-vinted  rounded-md p-2 md:m-2 max-md:m-1 text-white w-40 text-xs max-md:w-[31%]">
						Vends tes articles
					</button>
				</div>
			</header>
		</header>
	)
}

export default Header
