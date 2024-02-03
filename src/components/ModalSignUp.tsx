import { ReactElement } from 'react'
import SignUp from '../pages/SignUp'

type ModalSignUpProps = {
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setToken: React.Dispatch<React.SetStateAction<string>>
}

const ModalSignUp = ({
	setDisplaySignUp,
	setDisplayLogin,
	setToken,
}: ModalSignUpProps): ReactElement => {
	return (
		<div
			className="h-screen w-screen top-0 flex justify-center items-center bg-gray-300/50 absolute "
			onClick={() => setDisplaySignUp(false)}
		>
			<div
				className="max-md:w-11/12 md:w-1/3 max-md:h-3/4 h-2/3 flex justify-center items-center bg-white "
				onClick={(event) => event.stopPropagation()}
			>
				<div className="h-full w-full flex justify-center items-center">
					<SignUp
						layoutSignUp="h-[100%] w-screen flex flex-col items-center py-4  "
						styleSignUp=" h-full w-11/12 flex flex-col  justify-around "
						setDisplayLogin={setDisplayLogin}
						setDisplaySignUp={setDisplaySignUp}
						setToken={setToken}
					/>
				</div>
			</div>
		</div>
	)
}

export default ModalSignUp
