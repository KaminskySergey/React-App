import { LuPlus } from "react-icons/lu";
import Button from "../button/Button";
import { useState } from "react";
import Modal from "../modal/Modal";
import ModalCreateTodo from "../modal/ModalCreateTodo";

interface IAddNewCard {
    currentCategory: string
}

export default function AddNewCard({currentCategory}: IAddNewCard) {
    const [isOpen, setIsOpen] = useState(false)
const handleToggle = () => {
    setIsOpen(pS => !pS)
}
    
    return (<>
    <div className="px-4 py-2 border-dashed border-2 border-[#EBEDF1] rounded">
        <Button onClick={handleToggle} type="button" addNewCard >
            <LuPlus size={24}/> Add New Card
        </Button>
    </div>
    {isOpen && <Modal>
        <ModalCreateTodo currentCategory={currentCategory} handleToggle={handleToggle}/>
    </Modal>}
    </>)
}
