import Button from "../button/Button";
import { CiMenuKebab } from "react-icons/ci";
import AddNewCard from "./AddNewCard";
import TodoList from "./TodoList";
import TodoCard from "./TodoCard";
import { ICategory } from "../../types/category.interface";
import { ITask } from "../../types/task.interface";

import ModalMenu from "../modal/ModalMenu";
import { useModalMenu } from "../../hooks/useModalMenu";
import Modal from "../modal/Modal";
import ModalCreateTodo from "../modal/ModalCreateTodo";
import { useState } from "react";

import { useToggle } from "../../hooks/useToggle";
import ModalList from "../modal/ModalList";

interface IItemList {
    category: ICategory,
    tasksByCategory: ITask[]
}

export default function ItemList({ category, tasksByCategory }: IItemList) {
    const { isOpen,
        popupRef,
        handleToggle, togglePopup } = useModalMenu()
        const {isOpen: isOpenCreateTodo, handleToggle: handleToggleCreateTodo} = useToggle()
        const [isOpenUpdateList, setIsOpenUpdateList] = useState(false);
        const handleToggleUpdateList = () => {
            setIsOpenUpdateList(pS => !pS)
        }

        
    return <>
        <li className="min-w-[320px] flex flex-col gap-5" >
            <div className="flex justify-between items-center border-t-2 border-b-2 border-[#EBEDF1] text-[18px] font-bold pt-2 pb-2">
                <div className="">
                    <h2>{category.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <p>12</p>
                    </div>
                    <div className="h-[20px] w-[20px] relative" ref={popupRef}>
                        <Button type="button" className="icon-button" onClick={handleToggle}><CiMenuKebab size={20} /></Button>
                        {isOpen && <ModalMenu handleToggleCreateTodo={handleToggleCreateTodo} handleToggleUpdateList={handleToggleUpdateList} id={category.id} togglePopup={togglePopup} />}
                    </div>
                </div>
            </div>
            <div>
                <AddNewCard currentCategory={category.name} />
            </div>
            <div>
                <TodoList>
                    {
                        tasksByCategory && tasksByCategory.map(el => (
                            <TodoCard key={el.id} todo={el} />
                        ))
                    }
                </TodoList>
            </div>
        </li>
        {isOpenUpdateList && <Modal><ModalList handleToggle={handleToggleUpdateList} currentName={category.name} id={category.id} isEditing/></Modal>}
        {isOpenCreateTodo && <Modal><ModalCreateTodo handleToggle={handleToggleCreateTodo} currentCategory={category.name}/></Modal>}
    </>
}
