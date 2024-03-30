
import HistoryContent from './HistoryContent';
import styled from './history.module.css'
import { IoCloseSharp } from "react-icons/io5";
import styles from './history.module.css'
interface IHistory {
    handleToggle: () => void
}
export default function History({ handleToggle }: IHistory) {

    return (
        <>
        <div className={styles.backdrop} >
            <div className={styled.history}>
                <div className='absolute top-0 left-0 w-full h-[80px] p-[10px] bg-slate-600 flex items-center justify-between'>
                    <h2 className='font-bold text-[24px] text-black'>History</h2>
                    <button type='button' onClick={handleToggle}>
                        <IoCloseSharp size={40}/>
                    </button>
                </div>
                <div >
                    <HistoryContent />
                </div>
            </div>
            </div>
        </>
    );
}
