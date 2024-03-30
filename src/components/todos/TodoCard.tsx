import { CiMenuKebab } from "react-icons/ci";
import { MdCalendarToday } from "react-icons/md";
import { truncateText } from "../../utils/truncate-text";
import { ITask } from "../../types/task.interface";
import Button from "../button/Button";
import ModalMenu from "../modal/ModalMenu";
import { ChangeEvent, useState } from "react";
import { useModalMenu } from "../../hooks/useModalMenu";
import Modal from "../modal/Modal";
import ModalCreateTodo from "../modal/ModalCreateTodo";
import TodosDetails from "./todo-details/TodosDetails";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { selectIsList } from "../../redux/list/selectors";
import { taskUpdate } from "../../redux/todo/operations";
import { formatDateDetails } from "../../utils/format-date";


interface ITodoCard {
    todo: ITask
 }

export default function TodoCard({ todo}: ITodoCard) {
    const { isOpen,
        popupRef,
        handleToggle, togglePopup } = useModalMenu()
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenTodoDetails, setIsOpenTodoDetails] = useState(false);
    const dispatch = useAppDispatch()

    const handleToggleCreate = () => {
        setIsOpenCreate(pS => !pS)
    }

    const handleOpenTodoDetails = () => {
        setIsOpenTodoDetails(pS => !pS)
    }

    const allStatus = useAppSelector(selectIsList)

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.stopPropagation(); 
        const { value } = event.target;
        const updatedTodo = { ...todo, category: value };
        dispatch(taskUpdate(updatedTodo))
    };

   
    return <>
    <li onClick={handleOpenTodoDetails}  className="flex flex-col justify-between h-52 hover:border-yellow-500 transition-all	  border-solid border-2 px-2.5 py-3 rounded-lg">
        <div className="flex justify-between items-center">
            <div className="text-[18px] font-bold">
                <h3>{todo.name}</h3>
            </div>
            <div ref={popupRef} className="relative h-[20px] w-[20px]">
                <Button todoCard type="button" onClick={(event) => {
                event.stopPropagation(); 
                handleToggle()}}><CiMenuKebab size={20}/></Button>
                {isOpen && <ModalMenu taskChange handleToggleCreate={handleToggleCreate}  currentCategory={todo.category} id={todo.id} togglePopup={togglePopup}/>}
            </div>
        </div>
        <div className="text-left text-[#979BAD] ">
            <p className=" break-all">{truncateText(todo.description, 70)}</p>
        </div>
        <div className="text-left flex gap-3 items-center font-bold">
            <MdCalendarToday /> {formatDateDetails(todo.date)}
        </div>
        <div className="text-left font-bold">
            <p>{todo.priority}</p>
        </div>
        <div className="text-left font-bold w-[50%]">
        <select
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={todo.category}
                    className={`w-full p-2 border ${todo.category ? 'border-gray-300' : 'border-red-500'} h-[45px] rounded-md`}
                    onClick={(event) => event.stopPropagation()}
                >
                    <option value="">Select a category</option>
                    {allStatus.map(el => (
                        <option key={el.id} value={el.name}>{el.name}</option>
                    ))}
                </select>
        </div>
    </li>
    {isOpenCreate && <Modal><ModalCreateTodo currentCategory={todo.category} handleToggle={handleToggleCreate}/></Modal>}
    {isOpenTodoDetails && <TodosDetails handleOpenTodoDetails={handleOpenTodoDetails} id={todo.id}/>}
    </>
}

