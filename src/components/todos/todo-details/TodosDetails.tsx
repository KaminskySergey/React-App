import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import { IoCloseSharp } from "react-icons/io5";
import TodoInfoLinks from "./TodoInfoLinks";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { useEffect } from 'react'
import { taskById } from "../../../redux/todo/operations";
import { selectIsTaskById } from "../../../redux/todo/selectors";
import TodoActivityRight from "./TodoActivityRight";
interface ITodosDetails {
    id: string
    handleOpenTodoDetails: () => void
}

export default function TodosDetails({handleOpenTodoDetails, id }: ITodosDetails) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(taskById(id))
    }, [dispatch, id])
    const currentTask = useAppSelector(selectIsTaskById)
    if(!currentTask) return
    return <Modal>
        <div className="md:w-[600px] md:h-[450px] lg:w-[1000px] lg:h-[600px]  bg-white flex rounded-lg relative ">
            <div className="w-[60%] pt-[64px] pl-[32px] pr-[16px] pb-[16px]  h-full">
                <TodoInfoLinks todo={currentTask} />
            </div>
            <div className="w-[40%] h-full rounded-lg bg-slate-100 pt-[64px] pl-[32px] pr-[16px] pb-[16px] ">
                   <TodoActivityRight id={id}/>
            </div>
        </div>
        <div className="absolute top-[-1px] left-0 w-full h-[32px] rounded-t-lg  bg-[#172554]">
            <div className="absolute right-[7px] top-[-4px]">
                <Button type="button" onClick={handleOpenTodoDetails}>
                    <IoCloseSharp color="white" />
                </Button>
            </div>
        </div>
    </Modal>
}
