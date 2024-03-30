import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    history?: boolean
    createList?: boolean
    addNewCard?: boolean
    onToggle?: () => void
    orderModal?: boolean
    menu?: boolean
    todoCard?: boolean
    isEditing?: boolean
    details?: boolean
    historyClose?: boolean
    green?: boolean
    red?: boolean
  }
  
  const Button: React.FC<ButtonProps> = ({historyClose, green ,red,details, isEditing, todoCard, menu, addNewCard, createList , history, onToggle, children, ...props }) => {
    const baseStyles = 'font-bold  h-10  rounded-md focus:outline-none transition duration-300  flex justify-center	items-center';
    const buttonStyles = clsx(baseStyles, {
      'md:w-[128px] sm:w-[64px] h-[40px] bg-[#0000FF] py-2 px-4 gap-2 text-white text-[12px] md:text-[16px]': history,
      'md:w-[200px] sm:w-[100px] h-[40px] bg-green-500 py-3 px-4 gap-2 text-white text-[12px] md:text-[16px]': createList,
      'w-full p-0 h-full py-2 px-4 gap-2 text-black icon-button': addNewCard,
      'w-auto p-0 h-full py-2 px-4 gap-1 text-black icon-button font-medium text-[12px] ': menu,
      'w-auto p-0 h-full gap-1 text-black icon-button font-medium text-[12px] ': todoCard,
      'w-auto p-0 h-full gap-2 text-black bg-yellow-500 icon-button font-medium text-[12px] ': isEditing,
      'w-auto p-2 hover:bg-slate-200 h-full gap-2 border border-black border-solid border-1 text-black bg-slate-100 icon-button font-medium text-[12px] ': details,
      'w-[20px] p-2 hover:bg-slate-200 h-full gap-2  ': historyClose,
      'bg-emerald-500 text-white hover:bg-emerald-600': green,
      'bg-red-500 text-white hover:bg-red-600': red
    });
  
    return (
      <button onClick={onToggle}  className={buttonStyles} {...props}>
        {children}
      </button>
    );
  };
  
  export default Button;