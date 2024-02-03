import { ReactElement } from 'react'
import Login from '../pages/Login'

type ModalLoginProps = {
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
	setToken: React.Dispatch<React.SetStateAction<string>>
}

const ModalLogin = ({
	setDisplayLogin,
	setDisplaySignUp,
	setToken,
}: ModalLoginProps): ReactElement => {
	return (
		<div
			className="h-screen w-screen top-0 flex justify-center items-center bg-gray-300/50 absolute "
			onClick={() => setDisplayLogin(false)}
		>
			<div
				className="max-md:w-11/12 md:w-1/3 max-md:h-3/4 h-2/3 flex justify-center items-center bg-white relative"
				onClick={(event) => event.stopPropagation()}
			>
				<div className="h-full w-full flex justify-center items-center">
					<Login
						layout="h-[100%] w-screen flex flex-col items-center py-4  "
						styleForm="h-1/2  w-11/12"
						setToken={setToken}
						setDisplayLogin={setDisplayLogin}
						setDisplaySignUp={setDisplaySignUp}
					/>
				</div>
			</div>
		</div>
	)
}

export default ModalLogin
