import Button from "../../button/Button";
import { FaEdit } from "react-icons/fa";
import { TfiTarget } from "react-icons/tfi";
import { MdCalendarToday } from "react-icons/md";
import { LuTags } from "react-icons/lu";
import { ITask } from "../../../types/task.interface";
import { useState } from "react";
import TodoFormEdit from "./TodoFormEdit";
import { formatDateDetails } from "../../../utils/format-date";

interface ITodoInfoLinks {
    todo: ITask
}

export default function TodoInfoLinks({ todo }: ITodoInfoLinks) {
    const [isEditing, setIsEditing] = useState(false)

    const handleEditing = () => {
        setIsEditing(pS => !pS)
    }
    return <div className="flex flex-col gap-8">

        {!isEditing ?<><div className="flex justify-between items-center">
            <div>
                <h2 className="font-bold text-[24px] text-black">{todo.name}</h2>
            </div>
            <div className="flex gap-2">
                
                 <Button type="button" details onClick={handleEditing}>
                    <FaEdit /> Edit task
                </Button>
            </div>
        </div>
        <div className="flex gap-[70px]">
            <div>
                <div className="flex gap-2 items-center"> <TfiTarget /> Status</div>
                <div className="flex gap-2 items-center"> <MdCalendarToday /> Due date</div>
                <div className="flex gap-2 items-center"> <LuTags /> Priority</div>
            </div>
            <div>
                <div className="flex gap-2 items-center fond-bold text-black">{todo.category}</div>
                    <div className="flex gap-2 items-center">{formatDateDetails(todo.date)}</div>
                    <div className="flex gap-2 items-center">{todo.priority}</div>
            </div>
        </div>
        <div className="flex flex-col gap-5">
            <div>
                <h3 className="font-bold text-[20px] text-black">Description</h3>
            </div>
            <div>
                {todo.description}
            </div>
        </div></> : <TodoFormEdit handleEditing={handleEditing} todo={todo} />}

    </div >
}
