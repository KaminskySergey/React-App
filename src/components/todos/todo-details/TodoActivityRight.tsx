import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux-hooks"
import { selectIsTaskHistory } from "../../../redux/todo/selectors"
import { formatDateDetails } from "../../../utils/format-date";
import { IHistory } from "../../../types/history.interface";

interface ITodoActivityRight {
    id: string
}
export default function TodoActivityRight({ id }: ITodoActivityRight) {
    const history = useAppSelector(selectIsTaskHistory);
    const [sortedItems, setSortedItems] = useState(history);
    function compareFields(item: IHistory) {
        const changes: JSX.Element[] = [];
        if (item.type === "ADD_TODO") {
            changes.push(<p key="name" className="font-bold text-[14px] text-slate-900">You created task <span className="font-bold text-black">'{item.newValue.name}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.newValue.date)}</span></p>);
        } else if(item.type === "EDIT_TODO") {

            if (item.oldValue?.name !== item.newValue.name) {
                changes.push(<p key="name" className="font-bold text-[14px] text-slate-900">You renamed this task from '<span className="font-bold">{item.oldValue?.name}</span>' to '<span className="font-bold">{item.newValue.name}</span>' <span className="font-medium text-[12px] text-slate-500">{formatDateDetails(item.dateHistory)}</span></p>);
            }
    
            if (item.oldValue?.status !== item.newValue.status) {
                changes.push(<p key="status" className="font-bold text-[14px] text-slate-900">You changed status from '<span className="font-bold">{item.oldValue?.status}</span>' to '<span className="font-bold">{item.newValue.status}</span>' <span className="font-medium text-[12px] text-slate-500">{formatDateDetails(item.dateHistory)}</span></p>);
            }
    
            if (item.oldValue?.category !== item.newValue.category) {
                changes.push(<p key="category" className="font-bold text-[14px] text-slate-900">You changed category from '<span className="font-bold">{item.oldValue?.category}</span>' to '<span className="font-bold">{item.newValue.category}</span>' <span className="font-medium text-[12px] text-slate-500">{formatDateDetails(item.dateHistory)}</span></p>);
            }
    
            if (item.oldValue?.date !== item.newValue.date) {
                changes.push(<p key="date" className="font-bold text-[14px] text-slate-900">You changed date from '<span className="font-bold">{item.oldValue?.date}</span>' to '<span className="font-bold">{item.newValue.date}</span>' <span className="font-medium text-[12px] text-slate-500">{formatDateDetails(item.dateHistory)}</span></p>);
            }
    
            if (item.oldValue?.priority !== item.newValue.priority) {
                changes.push(<p key="priority" className="font-bold text-[14px] text-slate-900">You changed priority from '<span className="font-bold">{item.oldValue?.priority}</span>' to '<span className="font-bold">{item.newValue.priority}</span>' <span className="font-medium text-[12px] text-slate-500">{formatDateDetails(item.dateHistory)}</span></p>);
            }
        }

        return changes;
    }


    useEffect(() => {
        const sortedItems = [...history].filter(el => id === el.idTodo).sort((a, b) => new Date(a.dateHistory).getTime() - new Date(b.dateHistory).getTime());
        setSortedItems(sortedItems)
    }, [history, id])
    return (
        <div>
            <ul className="flex flex-col gap-3 overflow-y-auto md:h-[370px] lg:h-[500px] activity">
            {sortedItems.map((item: IHistory, index: number) => (
                    <li key={index} className=''>
                        <ul className="flex flex-col gap-3">
                    {compareFields(item).map((change, changeIndex) => (
                        <li key={changeIndex}><div>{change}</div></li>
                    ))}
                </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}