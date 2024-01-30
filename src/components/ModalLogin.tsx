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
				className="w-1/3 h-2/3 flex justify-center items-center bg-white "
				onClick={(event) => event.stopPropagation()}
			>
				<div className="h-full w-full flex justify-center items-center">
					<Login
						layout="h-[80vh] w-screen flex flex-col justify-center items-center"
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
