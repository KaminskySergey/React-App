import Button from "../button/Button"
import { FaEdit } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { taskDelete } from "../../redux/todo/operations";

import { listDelete } from "../../redux/list/operations";


interface IModalMenu {
    togglePopup: () => void
    handleToggleCreate?: () => void | undefined
    handleToggleUpdateList?: () => void | undefined
    handleToggleCreateTodo?: () => void | undefined
    
    id: string
    currentCategory?: string
    handleDeleteList?: () => void | undefined
    taskChange?: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const menuData = [
    {
        id: '1',
        icon: <FaEdit color="#EAB308" size={20} />,
        text: <p className="text-[#EAB308]">Edit</p>
    },
    {
        id: '2',
        icon: <LuPlus color="#2BC665" size={20} />,
        text: <p className="text-[#2BC665]">Add New Card</p>
    },
    {
        id: '3',
        icon: <RiDeleteBin5Line color="red" size={20} />,
        text: <p className="text-red-500">Delete</p>
    }
]

export default function ModalMenu({handleToggleCreateTodo, handleToggleUpdateList,  id, togglePopup, taskChange }: IModalMenu) {

    const dispatch = useAppDispatch();


    const handleChangeTask = (text: string) => {
        switch (text) {
            case 'Delete':
                dispatch(taskDelete(id));
                break;
            
            default:
                break;
        }
    };

    const handleChangeList = (text: string) => {
        switch (text) {
            case 'Delete':
                dispatch(listDelete(id));
                break;
            case 'Add New Card':
                if (!handleToggleCreateTodo) return
                handleToggleCreateTodo();
                break;
            case 'Edit':
                if (!handleToggleUpdateList) return
                handleToggleUpdateList()
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div onClick={togglePopup} className="w-[170px] absolute bg-slate-300 text-left drop-shadow-2xl">
                <ul className="flex flex-col items-start">
                    {taskChange ? (
                        menuData.map(el => (
                            <li key={el.id} className="flex w-full transition-all hover:bg-slate-500">
                                {(el.text.props.children !== 'Add New Card') && (
                                    <Button type="button" menu onClick={() => handleChangeTask(el.text.props.children)}>
                                        <div className="mr-auto">{el.icon}</div>
                                        <div>{el.text}</div>
                                    </Button>
                                )}
                            </li>
                        ))
                        
                    ) : (
                        menuData.map(el => (
                            <li key={el.id} className="flex w-full transition-all hover:bg-slate-500">
                                <Button type="button" menu onClick={() => handleChangeList(el.text.props.children)}>
                                    <div className="mr-auto">{el.icon}</div>
                                    <div>{el.text}</div>
                                </Button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}