import { useToggle } from "../../hooks/useToggle";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import ModalList from "../modal/ModalList";
import Title from "../title/Title";


interface IHeader {
    handleToggleHistory: () => void
 }

export default function Header({ handleToggleHistory }: IHeader) {
    const { isOpen, handleToggle } = useToggle()
    return <header className="max-w-[1440px] w-[1440px] m-auto flex justify-between	px-[32px] py-[16px] items-center relative">
        <div>
            <Title />
        </div>
        <div className="flex items-center absolute top-[20px] right-[16px] gap-4" style={{zIndex: '4'}}>
            <Button type="button" history onClick={handleToggleHistory}>
                History
            </Button>
            <Button type="button" createList onClick={handleToggle}>
                Create New List
            </Button>
        </div>
        {isOpen && <Modal><ModalList handleToggle={handleToggle} /></Modal>}

    </header>
}
