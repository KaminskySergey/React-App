import { IoMdRefresh } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import Button from "../button/Button";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../modal/Modal";
import ModalList from "../modal/ModalList";


export default function HeaderButton() {
    const {isOpen, handleToggle} = useToggle()

    return <>
    <div className="flex items-center gap-4 relative">
        <Button type="button" history >
            <IoMdRefresh /> History
        </Button>
        <Button type="button" createList onClick={handleToggle}>
            <LuPlus /> Create New List
        </Button>
    </div>
    {isOpen && <Modal><ModalList handleToggle={handleToggle}/></Modal>}
    </>
}
