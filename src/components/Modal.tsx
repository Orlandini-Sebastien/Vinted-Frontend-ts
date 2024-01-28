//import { useState } from "react";
import Login from '../pages/Login'

/* type ModalProps = {
    setVisible : React.Dispatch<React.SetStateAction<boolean>>;
}{setVisible}:ModalProps  */

const Modal = () => {
	return (
		<div className=" absolute top-0 h-screen w-screen flex justify-center items-center bg-gray-200 opacity-50 ">
			<Login layout="bg-white  flex flex-col h-1/2 w-1/3 justify-center items-center " />
		</div>
	)
}

export default Modal
