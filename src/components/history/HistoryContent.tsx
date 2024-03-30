import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'
import { selectIsTaskHistory } from '../../redux/todo/selectors'
import { formatDateDetails } from '../../utils/format-date';
import { selectIsListHistory } from '../../redux/list/selectors';
import { IHistory } from '../../types/history.interface';

export default function HistoryContent() {
    const historyTodo = useAppSelector(selectIsTaskHistory);
    const historyList = useAppSelector(selectIsListHistory);

    const history = [...historyTodo, ...historyList];

    const [sortedItems, setSortedItems] = useState(history);
    
    function compareFields(item: IHistory) {
        const changes: JSX.Element[] = [];

        if (item.type === "ADD_TODO") {
            changes.push(<div>You created task <span className="font-bold text-black">'{item.newValue?.name}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.newValue?.date as string)}</span></div>);
        } else if (item.type === "DELETE_TODO") {
            changes.push(<div>
                You deleted task <span className="font-bold text-black">'{item.oldValue?.name}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span>
            </div>);
        } else if (item.type === "EDIT_TODO") {

            if (item.oldValue?.name !== item.newValue?.name) {
                changes.push(<div>You renamed  task from <span className="font-bold text-black">'{item.oldValue?.name}'</span> to <span>'${item.newValue?.name}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span></div>);
            }
            if (item.oldValue?.category !== item.newValue?.category) {
                changes.push(<div>You changed category from <span className="font-bold text-black">'{item.oldValue?.category}'</span> to <span className="font-bold text-black">'{item.newValue?.category}'</span>  <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span></div>);
            }
            if (item.oldValue?.date !== item.newValue?.date) {
                changes.push(<div>You changed date from <span className="font-bold text-black">'{formatDateDetails(item.oldValue?.date as string)}'</span> to <span className="font-bold text-black">'{formatDateDetails(item.newValue?.date as string)}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span> </div>);
            }
            if (item.oldValue?.priority !== item.newValue?.priority) {
                changes.push(<div>You changed priority from <span className="font-bold text-black">'{item.oldValue?.priority}'</span> to <span className="font-bold text-black">'{item.newValue?.priority}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span></div>);
            }
        } else if (item.type === "ADD_LIST") {
            changes.push(<div>You created list <span className="font-bold text-black">'{item.newValue?.name}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span></div>);
        } else if (item.type === "DELETE_LIST") {
            changes.push(<div>You deleted list <span className="font-bold text-black">'{item.oldValue?.name}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span></div>);
        } else if (item.type === "EDIT_LIST") {
            if (item.oldValue?.name !== item.newValue?.name) {
                changes.push(<div>You renamed list from <span className="font-bold text-black">'{item.oldValue?.name}'</span> to <span className="font-bold text-black">'{item.newValue?.name}'</span> <span className='pl-[7px] font-medium text-[12px] text-slate-500'>{formatDateDetails(item.dateHistory)}</span></div>);
            }
        }


        return changes;
    }
    useEffect(() => {
        const sortedItems = [...history].sort((a, b) => new Date(a.dateHistory).getTime() - new Date(b.dateHistory).getTime());
        setSortedItems(sortedItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historyTodo, historyList]);
    return (
        <div>
            <ul className='flex flex-col list-disc gap-[5px] text-start overflow-y-auto h-[600px] activity'>
                {sortedItems.map((item, index) => (
                    <li key={index} className=''>
                        {compareFields(item).map((change, changeIndex) => (
                            <div key={changeIndex}>{change}</div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}